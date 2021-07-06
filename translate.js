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
} = require('ramda')
const { reduceIndexed, mapIndexed } = require('ramda-adjunct')
const fs = require('fs')
const { Translate } = require('@google-cloud/translate').v2

const filename = process.argv[2]
const placeholder = ''

async function translateText(text) {
  const translate = new Translate()
  const [result] = await translate.translate(text, { to: 'zh' })
  return result
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
  // andThen(split(/%%%%%/g)),
  // andThen(log),
  translateText,
  // log,
  // join('%%%%%'),
  extractCodeBlock(false, codes),
  split('\n'),
  getFile,
)(filename)
