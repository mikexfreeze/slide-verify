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

## api 文档
```js
new SlideVerify(option)
```

### elementId

`option.elementId` 为挂载点的 dom id


### photo

type string 或 array

string 为图片网络地址

array 为图片地址的集合，slide-verify会随机调用其中的图片，并在刷新时更新。

### onSuccess

用户通过验证的回调函数

### onFail

验证失败的回调函数

### onRefresh

用户刷新的回调

## 特性

1. 使用 css-module 开发，没有 css 污染困扰 
2. UMD 方式打包，多种引入方式（未测试其他方式）



