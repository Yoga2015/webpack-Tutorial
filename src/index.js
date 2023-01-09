import $ from 'jquery';   // 1、使用 ES6 导入语法，导入 jquery

// 导入样式  （在 webpack 中 ，一切皆模块，都可以通过 ES6 导入语法进行导入和使用）
import './css/index.css'; // 进行编译 执行到这行时发现非 .js后缀名结尾 的模块，此时需引入 css-loader
// 导入 less 样式
import './css/index.less';

// 导入 图片，得到图片文件，
import logo from './images/logo.jpg';
console.log(logo);  // data:image/jpeg;base64,UklGRv4LAA
// 给 img标签 的 src 动态赋值
$('.box').attr('src', logo);

//2、 定义 jQuery 的入口函数
$(function () {
  // 实现奇偶行变色     // odd 和 even的索引是从0开始的 。  0 是 偶数 ，  1 是 奇数
  $('li:odd').css('background-color', 'red');    // 奇数行 为 红色   
  $('li:even').css('background-color', 'yellow');  // 奇数行 为 分红色
})


//3、定义 装饰器 函数  装饰器是在 React中使用的，不理解没关系，只需知道这是个webpack无法处理的高级语法，
function info(target) {
  target.info = 'Person info'
};

// 定义一个普通的类   Person类 那里会有红线，是警告不建议使用不稳定的语法，非报错。
@info
class Person { };

console.log(Person.info);

// console.lo(123);  设置 Source Map后 验证 在生产环境下，如果 只想定位报错的具体行数，且 不想暴露源码 


