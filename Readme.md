 webpack-Tutorial 项目

 创建 webpack-demo目录 ，然后初始化：yarn init -y

 webpack-demo目录下 新建 index.html

 webpack-demo目录下 新建一个 可以复用的模块  moduleLog.js
 
 webpack-demo目录下 新建src 目录 ，
 
 src 目录下 新建 index.js

 webpack-demo目录下 的 index.html 编写 script 脚本，并把src指向打包的结果
  <script src="./dist/bundle.js"></script>

回到 webpack-demo目录下 moduleLog.js 编写

export default function(){
    document.write("moduleLog is loaded")
}

 src 目录下 的 index.js 中导入刚创建的  moduleLog 模块

   import moduleLog from "../moduleLog";
   document.write("入口 js  is loaded");
   moduleLog();

 
 然后安装webpack
    yarn add webpack -D
    yarn add webpack-cli -D
 
 PS E:\node.js\webpack-demo> yarn webpack

 然后就能看到 在webpack-demo目录下多了一个 dist目录，dist目录下有一个main.js 文件。

运行 yarn run webpack 之后发生了什么？ 

 运行 yarn run webpack 之后，其实 webpack 给我们预制了入口文件，
 就是 src 目录下 的 index.js 入口文件，它会从这个文件开始入手，然后遍历这个文件里的所有模块，
 这里就只有 moduleLog 模块，它把它整个的执行过程当中需要用到的模块，它一股脑的全部加载进来，然后包括我本身的这些逻辑。也全都加载进来放在 dist目录下的main.js 文件 里面，
 所以说这个 src 目录下 的 index.js  和  dist目录下的main.js 都是一套逻辑，只不过main.js里做了一些形式的处理（版本不同处理不同）

webpack默认的入口就是 src 目录下 的 index.js ，webpack默认的出口就是dist目录下的main.js

如果我想把 webpack默认的入口修改？

在 webpack-demo目录下的新建 app.js ，里面的代码和 src 目录下 的 index.js 一样，
偏偏我项目需要，就从webpack-demo目录下的app.js 进入 ，以webpack-demo目录下的app.js 为入口，
就不得不自定义配置了，往往是在webpack-demo目录下新建一个 webpack.config.js，

webpack在运行的时候，如果它发现你有一个 webpack.config.js，那么它就会走 webpack.config.js里面指定的配置。

进入webpack-demo目录下的webpack.config.js 配置：
path 模块 是我们需要处理路径的时候，所需要用到的一个模块。

const path = require('path');

module.exports = {
    entry:'./app.js',   //工程资源的入口，可以是一个文件也可以是多个文件
    output:{
        path:path.join(__dirname,'./dist'),  //绝对路径
        filename:'bundle.js',
    }
}


webpack-demo目录下 的 index.html 中修改引入的script文件
<script src="./dist/bundle.js"></script>

现就执行 yarn webpack  跑一下代码 看看有没有按照指定的更新！

到这里，我们也顺利的引出了webpack核心概念里面的 entry、output。

到这里，我们就把module.exports 中最必要的属性讲明白了，

但在本地开发的时候，我们有时候，希望能够在debugging的时候能够方便一点，我们希望所见及所得

那我们这种情况下，一般都会通过一个叫 webpack-dev-server来起个本地服务
它可以为我们带来开发中的一个便利，它最主要的功能就是说可以监听工程目录文件的改动，当我们修改源文件，然后再次保存的时候，它可以动态的、实时的为我们实现一个重新打包，并且自动刷新浏览器，我们可以看到效果。

PS E:\node.js\webpack-demo> yarn add webpack-dev-server -g
PS E:\node.js\webpack-demo> yarn
PS E:\node.js\webpack-demo> yarn webpack-dev-server

现在服务起来了，就去浏览器看看这个服务 http://localhost:8080/

服务器里有什么就可以改什么，如果想修改 8080 端口 ，可以在webpack.config.js 中修改：
module.exports = {
    entry:'./app.js',   //工程资源的入口，可以是一个文件也可以是多个文件
    output:{
        path:path.join(__dirname,'dist'),  //绝对路径
        filename:'bundle.js',
    },
    devServer:{
        port:3000,  //服务端口
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    }
}

手动 yarn webpack 生产的 （dist目录下的bundle.js），现在删除 dist目录下的bundle.js 后，
再去启用webpack-dev-server：
PS E:\node.js\webpack-demo> yarn webpack-dev-server

你发现服务它还能跑起来，但是  dist目录下已经没有bundle.js了，
现在webpack-demo目录下 的 index.html 中还引入着 bundle.js ，服务它还能跑起来，神奇吧！

这就是webpack-dev-server厉害的地方，其实它在打包的时候真的不会生成一个实际的文件，我们可以理解为它最终那个资源它就只存在于一个内存当中，然后当浏览器发出请求的时候，它会从内存中去加载，然后返回打包后的一个资源结果，它不会占用我们dist目录下面的一个实际的存储空间。

接下来 说说 webpack核心特性，一切皆模块。

那我们的工程里面，确实目前来看只有JavaScript，但是在前端世界里面可不只是这么简单。我们很多时候我们是离不开CSS的，我们还有模板，样式文件，图片等等其它类型的资源，这就意味着我们还需要使用别的工具去管理这些，就是千奇百怪的各种各样的资源，在webpack这个思想中。所有的这些资源，就模板，样式，图片等等，都是模块，因为这些资源也具备模块的特性，就是说它们都负责特定的职能，并且具有可复用性，因此，我们也可以使用 webpack去管理所有的这些资源，并且把它们都当做模块来处理。

到了代码层面，让我们实际来用一下这个特性，我们现在在webpack-demo目录下创建一个style.css,并编写
body{
    background-color: blueviolet;
}

进入webpack-demo目录下的app.js 入口文件。编写导入：

import './style.css';

居然有人在JS文件里面去import一个CSS文件。这看上去很奇怪吧，看上去很鬼畜.

但是在模块语法层面来说，我们JS文文件里面确实只能引入JS，因为编译器它无法编译其它类型的文件。
然而在那个webpack中，我们可以在JS文件中引入CSS，还可以引入什么？我还可以引入less 、  scss 、 图片，那实际上，webpack它会处理，在依赖树中的所有资源，不管它是JS也好，还是说CSS也好，那webpack它是如何使得它在打包的过程中解析这些不属于JS的语法呢？

这就要提到webpack当中的另一个概念：loader。loader ，它可以理解成一种对webpack能力的一个拓展，webpack的本身它只能处理JS。对于别的类型的语法完全不认识，那如果说我们需要引入某一类型的模板，那么，就需要通过为它添加它对应的那个特别类型的一个loader才行。

比如说这里，我们就在JS里面，我们引入了一个style.css ，那我们就需要CSS的loader

loader它很多情况下，loader它是独立于webpack以外的存在的，webpack内部并不包含任何的loader,所以说我们想要用loader ，必须手动安装。

我们现在为了处理 CSS ,  需要安装：
PS E:\node.js\webpack-demo> yarn add css-loader --save-dev

安装完还不够，我们所有的配置都是通过这个 webpack-demo目录下的webpack.config.js才能生效。所以说，我们现在我们编辑 webpack.config.js，在这里面我们怎么用loader, 每一个版本webpack对loader的使用方法、约定都不太一样，每一个版本都会有它自己的一个配置上的约定，现在使用的是 webpack4，是在module 字段下面配置 rules 规则, 在rules 里面一条条的去指定什么类型的文件用什么样的loader去处理:

首先一个test，它是文件规则，它对应的是一个正则表达式，这个正则表达式指定了哪一种文件是需要被我的loader处理的。然后是一个use ,use定义的是一个数组，数组是一个loader数组，它指定了说我这个文件，到底需要用哪些loader来处理，所以说我们刚刚在JS文件里面导入了一个CSS文件，所以需要用到 “css-loader”

const path = require('path');
module.exports = {
    entry:'./app.js',   //工程资源的入口，可以是一个文件也可以是多个文件
    output:{
        path:path.join(__dirname,'dist'),  //绝对路径
        filename:'bundle.js',
    },
    devServer:{
        port:3000,  //服务端口
        static: {
            directory: path.join(__dirname, 'dist'),
          },
    },

    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'css-loader'
                ]
            }
        ]
    }

}

然后在控制台执行编译  yarn webpack-dev-server  然后去浏览器看看效果

安装css-loader 仅只是解决了css语法解析的问题，然而却并没有能把样式实际地加载到页面上，
那如果我要想让这个样式加载到页面上去怎么办呢？我们要再多用一个loader ，叫 style-loader ,它可以帮我们解决 这个样式加载到页面上 的问题，他做了什么？他会为我们的样式生成一个style标签，并且插入到webpack-demo目录下 的 index.html 这个页面中。我们既然要用这个style-loader，就去安装：

yarn add css-loader --save-dev
yarn add style-loader --save-dev

然后在控制台执行编译  yarn webpack-dev-server  然后去浏览器看看效果

结果报错了：
ERROR in ./style.css
Module build failed (from ./node_modules/style-loader/dist/cjs.js):
TypeError: this.getOptions is not a function
    at Object.loader (E:\node.js\webpack-demo\node_modules\style-loader\dist\index.js:19:24)
 @ ./app.js 2:0-21

loader的配置顺序和它的加载顺序其实是相反的,也就是说先解析 css ，然后才去加载到页面上。

说完loader ,就来说说plugins，plugins它相对来loader来说，它都是用来增强一个项目里面，webpack的功能，那plugins和loader有什么区别？
其实plugins它的机制是强调一个事件监听的能力，plugins可以在webpack的内部去监听一些事件，并且改变一些文件打包后的输出结果，那我们这里举个例子：

就是说我们现在已经可以打包出文件了，我们也可以去编译css了，但是，我们希望说能够让我们这个页面能渲染更快一些。我们希望JS、CSS这样的资源能够更快的传到客户端，是不是所有传输的资源,是不是体积越小越好，对吧。
所以我们现在想对资源做一个压缩的处理，那webpack也可以帮我们做压缩的这个工作。那压缩，它实际上就是从源代码中，去去掉生产环境下不必要的一些内容，比如说代码中的注释，换行，空格，这些对我们来说，能够帮助我们开发者读代码，读的更舒服，但是用户不要那些，所以去掉这些之后，我们就可以减少资源的整体体积了。同时，也根本不影响代码的实际功能，这些用户是不感知的。添加压缩功能，我们就需要用到webpack的一个plugins配置项：

PS E:\node.js\webpack-demo>  yarn add uglifyjs-webpack-plugin -D

安装完还不够，我们所有的配置都是通过这个 webpack-demo目录下的webpack.config.js才能生效。所以说，我们现在我们编辑 webpack.config.js:

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    plugins:[
            new UglifyJsPlugin(),
    ]
}

bundle.js  5.25 KiB 、  bundle.js  2.51 KiB 

可以看出 uglifyjs-webpack-plugin  可以帮忙我们减小代码的体积。

loader 、plugins 是相互相成的搭档，不能都互相替代的关系.


























  

 
 
 
