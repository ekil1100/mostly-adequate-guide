# 附录 C：Pointfree 实用程序

在本附录中，您将找到相当经典的 JavaScript 函数的 pointfree 版本
书中描述。以下所有功能似乎都可以在练习中使用，如
全球背景的一部分。请记住，这些实现可能不是最快的或
最有效的实施方式；他们*仅用于教育目的*。

为了找到更适合生产的功能，请查看
[ramda](https://ramdajs.com/)、[lodash](https://lodash.com/) 或 [folktale](http://folktale.origamitower.com/)。

请注意，函数是指 [Appendix A](./appendix_a.md) 中定义的 `curry` 和 `compose` 函数

＃＃ 添加

```js
// add :: Number -> Number -> Number
const add = curry((a, b) => a + b)
```

##追加

```js
// append :: String -> String -> String
const append = flip(concat)
```

＃＃ 链

```js
// chain :: Monad m => (a -> m b) -> m a -> m b
const chain = curry((fn, m) => m.chain(fn))
```

##连接

```js
// concat :: String -> String -> String
const concat = curry((a, b) => a.concat(b))
```

## 等式

```js
// eq :: Eq a => a -> a -> Boolean
const eq = curry((a, b) => a === b)
```

＃＃ 筛选

```js
// filter :: (a -> Boolean) -> [a] -> [a]
const filter = curry((fn, xs) => xs.filter(fn))
```

＃＃ 翻动

```js
// flip :: (a -> b -> c) -> b -> a -> c
const flip = curry((fn, a, b) => fn(b, a))
```

## forEach

```js
// forEach :: (a -> ()) -> [a] -> ()
const forEach = curry((fn, xs) => xs.forEach(fn))
```

＃＃ 头

```js
// head :: [a] -> a
const head = (xs) => xs[0]
```

## 插入

```js
// intercalate :: String -> [String] -> String
const intercalate = curry((str, xs) => xs.join(str))
```

＃＃ 加入

```js
// join :: Monad m => m (m a) -> m a
const join = (m) => m.join()
```

＃＃ 最后的

```js
// last :: [a] -> a
const last = (xs) => xs[xs.length - 1]
```

＃＃ 地图

```js
// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn))
```

＃＃ 比赛

```js
// match :: RegExp -> String -> Boolean
const match = curry((re, str) => re.test(str))
```

##道具

```js
// prop :: String -> Object -> a
const prop = curry((p, obj) => obj[p])
```

＃＃ 减少

```js
// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero))
```

＃＃ 代替

```js
// replace :: RegExp -> String -> String -> String
const replace = curry((re, rpl, str) => str.replace(re, rpl))
```

＃＃ 撤销

```js
// reverse :: [a] -> [a]
const reverse = (x) =>
  Array.isArray(x) ? x.reverse() : x.split('').reverse().join('')
```

##安全头

```js
// safeHead :: [a] -> Maybe a
const safeHead = compose(Maybe.of, head)
```

##安全最后

```js
// safeLast :: [a] -> Maybe a
const safeLast = compose(Maybe.of, last)
```

## 安全道具

```js
// safeProp :: String -> Object -> Maybe a
const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj))
```

＃＃ 顺序

```js
// sequence :: (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
const sequence = curry((of, f) => f.sequence(of))
```

＃＃ 排序方式

```js
// sortBy :: Ord b => (a -> b) -> [a] -> [a]
const sortBy = curry((fn, xs) =>
  xs.sort((a, b) => {
    if (fn(a) === fn(b)) {
      return 0
    }

    return fn(a) > fn(b) ? 1 : -1
  }),
)
```

＃＃ 分裂

```js
// split :: String -> String -> [String]
const split = curry((sep, str) => str.split(sep))
```

＃＃ 拿

```js
// take :: Number -> [a] -> [a]
const take = curry((n, xs) => xs.slice(0, n))
```

## toLowerCase

```js
// toLowerCase :: String -> String
const toLowerCase = (s) => s.toLowerCase()
```

## toString

```js
// toString :: a -> String
const toString = String
```

## 大写

```js
// toUpperCase :: String -> String
const toUpperCase = (s) => s.toUpperCase()
```

##遍历

```js
// traverse :: (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
const traverse = curry((of, fn, f) => f.traverse(of, fn))
```

## unsafePerformIO

```js
// unsafePerformIO :: IO a -> a
const unsafePerformIO = (io) => io.unsafePerformIO()
```
