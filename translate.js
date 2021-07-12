require('dotenv').config()
const {
  tap,
  split,
  reduce,
  join,
  compose,
  andThen,
  map,
  flatten,
  aperture,
  transpose,
} = require('ramda')
const { reduceIndexed, mapIndexed } = require('ramda-adjunct')
const fs = require('fs')
const { Translate } = require('@google-cloud/translate').v2

const filename = process.argv[2]
const placeholder = ''

const to2D = (num, length) => {
  let temp = []
  let n = num
  let a = 1
  return reduce((acc, elem) => {
    a++
    if (n > 1) {
      temp.push(elem)
      n--
    } else {
      temp.push(elem)
      n = num
      acc.push(temp)
      temp = []
    }
    if (length - a === 0 && length % num !== 0) {
      acc.push(temp)
    }
    return acc
  }, [])
}

async function translateText(text) {
  const length = text.length
  const translate = new Translate()
  const res = map(async (v) => {
    const [res] = await translate.translate(v, { to: 'zh' })
    return res
  }, to2D(100, length)(text))
  return flatten(await Promise.all(res))
}

// string[] -> string[]
const extractCodeBlock = (isCode, codeBlockMap) =>
  mapIndexed((elem, idx) => {
    if (elem.includes('```')) {
      isCode = !isCode
      codeBlockMap[idx] = elem
      return placeholder
    }
    if (isCode) {
      codeBlockMap[idx] = elem
      return placeholder
    } else {
      return elem === '' ? placeholder : elem
    }
  })

// string[] -> string[]
const recoverCodeBlock = (codeBlockMap) =>
  mapIndexed((elem, idx) => {
    if (codeBlockMap[idx]) {
      return codeBlockMap[idx]
    } else if (elem === placeholder) {
      return ''
    } else {
      return elem
    }
  })

// string -> string
const getFile = (filename) => fs.readFileSync(filename, 'utf8')

// string -> void
const putFile = (res) => fs.writeFileSync(`./src/${filename}`, res, 'utf8')

const log = tap(console.log)

const codes = {}

compose(
  andThen(putFile),
  // andThen(log),
  andThen(join('\n')),
  andThen(recoverCodeBlock(codes)),
  // andThen(log),
  translateText,
  extractCodeBlock(false, codes),
  split('\n'),
  getFile,
)(filename)
