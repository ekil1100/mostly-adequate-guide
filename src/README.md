[![cover](../images/cover.png)](SUMMARY.md)

##关于这本书

这是一本关于一般功能范式的书。我们将使用世界上最流行的函数式编程语言：JavaScript。有些人可能会觉得这是一个糟糕的选择，因为它与当前的文化背道而驰，而目前这种文化是必不可少的。但是，我认为这是学习 FP 的最佳方式，原因如下：

- **您可能每天都在工作中使用它。**

  这使得每天在现实世界的程序中练习和应用您获得的知识成为可能，而不是在晚上和周末用深奥的 FP 语言进行宠物项目。

- **我们无需预先学习所有内容即可开始编写程序。**

  在纯函数式语言中，不使用 monad 就无法记录变量或读取 DOM 节点。在这里，我们可以在学习净化代码库时作弊。开始使用这种语言也更容易，因为它是混合范式，您可以在知识空白的情况下依靠当前的实践。

- **该语言完全有能力编写一流的功能代码。**

  在一个或两个小库的帮助下，我们拥有模仿 Scala 或 Haskell 等语言所需的所有功能。面向对象编程目前在这个行业占据主导地位，但在 JavaScript 中显然很尴尬。这类似于在高速公路上露营或穿着套鞋跳踢踏舞。我们必须在所有地方‘绑定’，以免‘this’从我们下面改变，当忘记‘new’关键字时，我们有各种变通方法来解决这种古怪的行为，私有成员只能通过闭包使用。对我们很多人来说，无论如何，FP 感觉更自然。

也就是说，毫无疑问，类型化函数式语言将成为以本书呈现的风格进行编码的最佳场所。 JavaScript 将成为我们学习范式的手段，您在何处应用它取决于您。幸运的是，这些接口是数学式的，因此无处不在。您会发现自己在 Swiftz、Scalaz、Haskell、PureScript 和其他数学倾向的环境中如鱼得水。

## 在线阅读

为了获得最佳阅读体验，[通过 Gitbook 在线阅读](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)。

- 快速访问侧栏
- 浏览器内练习
- 深入的例子

## 玩转代码

为了使培训更有效率，并且在我给您讲另一个故事时不会太无聊，请务必使用本书中介绍的概念。有些可能一开始很难捕捉，但通过弄脏手可以更好地理解。
书中介绍的所有函数和代数数据结构都集中在附录中。相应的代码也可以作为 npm 模块使用：

```bash
$ npm i @mostly-adequate/support
```

或者，每章的练习都是可运行的，可以在您的编辑器中完成！例如，完成`exercises/ch04`中的`exercise_*.js`，然后运行：

```bash
$ npm run ch04
```

＃＃ 下载它

查找预先生成的 **PDF** 和 **EPUB** 作为 [最新 Github 工作流的构建工件](https://github.com/MostlyAdequate/mostly-adequate-guide/actions/workflows/build.yml) .

＃＃ 自己做

> ⚠️ 这个项目设置现在有点旧，因此在本地构建时可能会遇到各种问题。如果可能，我们建议使用 node v10.22.1 和最新版本的 Calibre。

```
git clone https://github.com/MostlyAdequate/mostly-adequate-guide.git
cd mostly-adequate-guide/
npm install
npm run setup
npm run generate-pdf
npm run generate-epub
```

> 注意！要生成电子书版本，您需要安装“ebook-convert”。 [安装说明](https://gitbookio.gitbooks.io/documentation/content/build/ebookconvert.html)。

＃ 目录

见 [SUMMARY.md](SUMMARY.md)

### 贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md)

### 翻译

见 [TRANSLATIONS.md](TRANSLATIONS.md)

＃＃＃ 常问问题

见 [FAQ.md](FAQ.md)

＃ 对未来的计划

- **第 1 部分**（第 1-7 章）是基础指南。由于这是初稿，我正在更新，因为我发现了错误。随时提供帮助！
- **第 2 部分**（第 8-13 章）地址类型类，如函子和单子，一直到可遍历。我希望挤进变压器和一个纯粹的应用程序。
- **第 3 部分**（第 14 章及以上）将开始在实际编程和学术荒谬之间跳动。我们将研究共子、f-代数、自由单子、yoneda 和其他分类结构。

---

<p align="center">
  <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
    <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
  </a>
  <br />
  本作品已根据<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享署名-相同方式共享 4.0 国际许可</a>获得许可。
</p>
