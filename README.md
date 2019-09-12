# slide-verify

简体中文 | [English](./README-EN.md)

> 滑动条验证插件

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
import SlideVerify from '../dist/slide-verify'

let Slide = new SlideVerify({
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

名称 | 类型 | 默认值 | 说明 |
---|---|---|---
elementId | string | *null* | 挂载点的 dom id
photo | string or array | *null* | 背景图片url 或 背景图片url组成的数组
onSuccess | function | *null* | 验证通过时回调此函数
onFail function | *null* | 验证失败时回调此函数
onRefresh function | *null* | 点击重新加载图标时回调此函数

## 特性

1. 使用 css-module 开发，放心使用，没有 css 污染困扰
2. UMD 方式打包，多种引入方式（external、es6）

## 感谢 Contribution

此项目参考 [canvas滑动验证码](https://github.com/yeild/jigsaw)





