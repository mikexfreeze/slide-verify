# slide-verify

> js slide captcha plugin

## Live Demo

[live demo](https://blog.duandiwang.com/slide-verify/)

## Install
```shell
npm install slide-verify -S
```

## quick start
```js
import SlideVerify from '../dist/slide-verify'

let Slide = new SlideVerify({
  elementId: "root",
  onSuccess: () => {console.log("success")},
  onFail: () => {console.log("fail")},
  onRefresh: () => {console.log("refresh")},
  lang: 'en'
})
```
```html
<body>
    <div id="root"></div>
</body>
```
elementId for dom id

## Featrue

1. css-module developed
2. UMD



