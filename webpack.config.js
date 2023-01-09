const path = require('path');   // 导入 node.js中专门操作路径的模块
const HtmlPlugin = require('html-webpack-plugin'); //1、导入html-webpack-plugin，得到插件的构造函数

// 2、new构造函数，创建 html插件 的实例对象   此时只是生成实例，需放在 module.exports里才能被调用
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html',   // 指定 要复制 哪个页面
  filename: './index.html',   //指定 复制出来的 文件名 和 存放路径
});

//注意 左侧的花括号 { } 是解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 使用 Commonjs 规范 的导出语法 ，向外 导出 一个 webpack 的 配置对象 
module.exports = {
  // 代表 webpack 运行的模式 有两种： development  和 production
  // 结论 ：开发的时候 用 development ，因为追求的时打包的速度，而不是体积小；
  // 反过来，发布上线的时候一定要用 production ,因为上线追求的是体积小，而不是打包速度快！
  mode: 'development',
  //entry ： 告诉 webpack 指定要处理哪个文件
  entry: path.join(__dirname, './src/index.js'),  // 打包入口文件的路径
  //output ： 指定 生成的文件 存放到哪里
  output: {
    path: path.join(__dirname, './dist'),   //存放到目录
    // 明确告诉 webpack 把生成的 bundle.js 文件放到 dist 目录下 的 js 子目录中
    filename: 'js/bundle.js',   // 生成的文件名
  },
  //3、插件的数组，将来 webpack在运行时，会加载 并调用 这些插件
  plugins: [htmlPlugin, new CleanWebpackPlugin(),],   // 通过 plugins 节点，使 htmlPlugin 插件生效
  devServer: {
    open: true, // 初次打包完成后，自动打开浏览器
    port: 80,  // 在http协议中，如果端口号是80，可以被省略（仅显示为localhost）
    host: '127.0.0.1',
  },
  module: {   // 所有第三方 文件模块的匹配规则
    rules: [   // 文件后缀名 的 匹配规则    定义了 不同模块 对应的loader   
      //1、 处理 .css 文件的 loader
      {
        test: /\.css$/,    // test 用来 匹配的文件类型  // style-loader 和 css-loader 顺序不能写反
        use: ['style-loader', 'css-loader'],  // use 用来指定 对应 要调用的loader  
      },
      //2、处理 .less 文件 的 loader 
      {
        test: /\.less$/,     // 找到 .less 文件后，用 use 来处理
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //3、处理图片文件 的 loader
      //如果需要调用的loader 只有一个，则只传递一个字符串也行，如果多个loader, 则必须指定 数组 装着
      // 在配置 url-loader 的时候，多个参数之间， 使用 & 符号进行分隔
      {
        test: /\.jpg|png|gif$/,    // 找到 符合格式的图片后，用 use 来处理
        use: 'url-loader?limit=3000&outputPath=images',  // 其中 ？之后的是loader的参数项
      },
      //4、使用 babel-loader 处理高级的 js语法
      // 在配置 babel - loader 的时候，程序员只需要把自己的代码进行转换即可，一定要排除 node_modules目录下的文件
      // 因为第三方包中的 js 兼容性，不需要程序关心
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  //在生产环境下，如果 只想定位报错的具体行数 且 不想暴露源码，将 devtool的值设置为 nosources-source-map
  devtool: 'nosources-source-map',
}

