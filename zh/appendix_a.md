# 附录 A：基本功能支持

在本附录中，您将找到各种函数的一些基本 JavaScript 实现
书中描述。请记住，这些实现可能不是最快的或
最有效的实施；他们*仅用于教育目的*。

为了找到更适合生产的功能，请查看
[ramda](https://ramdajs.com/)、[lodash](https://lodash.com/) 或 [folktale](http://folktale.origamitower.com/)。

请注意，某些函数还引用了[附录 B](./appendix_b.md) 中定义的代数结构

＃＃ 总是

```js
// always :: a -> b -> a
const always = curry((a, b) => a)
```

## 撰写

```js
// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]
```

＃＃ 咖喱

```js
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args)
    }

    return fn.call(null, ...args)
  }
}
```

＃＃ 任何一个

```js
// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value)
  }

  return g(e.$value)
})
```

＃＃ 身份

```js
// identity :: x -> x
const identity = (x) => x
```

＃＃ 检查

```js
// inspect :: a -> String
const inspect = (x) => {
  if (x && typeof x.inspect === 'function') {
    return x.inspect()
  }

  function inspectFn(f) {
    return f.name ? f.name : f.toString()
  }

  function inspectTerm(t) {
    switch (typeof t) {
      case 'string':
        return `'${t}'`
      case 'object': {
        const ts = Object.keys(t).map((k) => [k, inspect(t[k])])
        return `{${ts.map((kv) => kv.join(': ')).join(', ')}}`
      }
      default:
        return String(t)
    }
  }

  function inspectArgs(args) {
    return Array.isArray(args)
      ? `[${args.map(inspect).join(', ')}]`
      : inspectTerm(args)
  }

  return typeof x === 'function' ? inspectFn(x) : inspectArgs(x)
}
```

＃＃ 剩下

```js
// left :: a -> Either a b
const left = (a) => new Left(a)
```

##liftA2

```js
// liftA2 :: (Applicative f) => (a1 -> a2 -> b) -> f a1 -> f a2 -> f b
const liftA2 = curry((fn, a1, a2) => a1.map(fn).ap(a2))
```

##liftA3

```js
// liftA3 :: (Applicative f) => (a1 -> a2 -> a3 -> b) -> f a1 -> f a2 -> f a3 -> f b
const liftA3 = curry((fn, a1, a2, a3) => a1.map(fn).ap(a2).ap(a3))
```

＃＃ 也许

```js
// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v
  }

  return f(m.$value)
})
```

＃＃ 没有什么

```js
// nothing :: Maybe a
const nothing = Maybe.of(null)
```

＃＃ 拒绝

```js
// reject :: a -> Task a b
const reject = (a) => Task.rejected(a)
```
