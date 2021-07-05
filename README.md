# slide-verify

简体中文 | [English](./README-EN.md)

> 滑动条验证插件

<a href="https://raw.githubusercontent.com/mikexfreeze/slide-verify/master/LICENSE.md"><img src="https://img.shields.io/npm/l/slide-verify" alt="License"/></a>
<!-- <a href="https://github.com/mikexfreeze/slide-verify/network/dependents"><img src="https://img.shields.io/librariesio/dependent-repos/npm/slide-verify?style=flat-square" alt="Dependents"/></a> -->
<a href="https://www.npmjs.com/package/slide-verify"><img src="https://img.shields.io/npm/dm/slide-verify?style=flat-square" alt="Downloads"/></a>

## 在线Demo

<p align="center">
  <a href="https://blog.duandiwang.com/slide-verify/">
    <img width="310" src="https://blog.duandiwang.com/slide-verify/public/slide-verify-exmaple-01.png">
  </a>
</p>

[在线Demo](https://blog.duandiwang.com/slide-verify/)

## 安装

```shell
npm install slide-verify -S
```

## 快速开始

```js
import SlideVerify from 'slide-verify'

const Slide = new SlideVerify({
  elementId: "root", // DOM挂载点
  onSuccess: () => {console.log("success")}, // 成功回调
  onFail: () => {console.log("fail")}, // 失败回调
  onRefresh: () => {console.log("refresh")}, // 刷新回调
  photo: 'www.xxx.com/img' // 背景图片地址
})
```

```html
<body>
    <div id="root"></div>
</body>
```

elementId 为挂载点的 dom id

### 外部引入方式

```html
<head>
    <script src="../node_modules/slide-verify/dist/slide-verify.js"></script>
</head>
<body>
   <div id="root"></div>
   <script>
     var Slide = new SlideVerify({
       elementId: "root",
       onSuccess: () => {console.log("success")},
       onFail: () => {console.log("fail")},
       onRefresh: () => {console.log("refresh")},
     })
   </script>
</body>
```

## api

```js
new SlideVerify(option)
```

### Options

名称 | 类型 | 必填 | 默认值 | 说明 |
---|---|---|---|---
elementId | string | 是 | *null* | 挂载点的 dom id
photo | string or array | 否 | *null* | 背景图片url 或 背景图片url组成的数组
onSuccess | function | 是 | *null* | 验证通过时回调此函数
onFail | function | 是 | *null* | 验证失败时回调此函数
onRefresh | function | 是 | *null* | 点击重新加载图标时回调此函数
source | array | 否 | *null* | [x, y, width, height] 仅在设置 photo 之后生效，截取给定图片。x,y 设置截取的横纵坐标起始点，width, height 设置截取的宽度和高度，[举例](https://github.com/mikexfreeze/slide-verify/issues/4#issuecomment-727855481)

## 特性

1. 使用 css-module 开发，放心使用，没有 css 污染困扰
2. UMD 方式打包，多种引入方式（external、es6）
3. 支持 TypeScript 内含 types 声明文件

## 感谢 Contribution

此项目参考 [canvas滑动验证码](https://github.com/yeild/jigsaw)
