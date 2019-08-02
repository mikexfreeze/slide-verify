# slide-verify

简体中文 | [English](./README-EN.md)

> 滑动条验证插件

## 在线Demo

<p align="center">
  <a href="https://blog.duandiwang.com/slide-verify/">
    <img width="310" src="http://pvlp7z12t.bkt.clouddn.com/slide-verify-exmaple-01.png">
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
  elementId: "root",
  onSuccess: () => {console.log("success")},
  onFail: () => {console.log("fail")},
  onRefresh: () => {console.log("refresh")},
})
```
```html
<body>
    <div id="root"></div>
</body>
```
elementId 为挂载点的 dom id

## 特性

1. 使用 css-module 开发，没有 css 污染困扰 
2. UMD 方式打包，多种引入方式（未测试其他方式）



