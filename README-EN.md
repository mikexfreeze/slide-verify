# slide-verify

> js slide captcha plugin

<a href="https://raw.githubusercontent.com/mikexfreeze/slide-verify/master/LICENSE.md"><img src="https://img.shields.io/npm/l/slide-verify" alt="License"/></a>
<a href="https://www.npmjs.com/package/slide-verify"><img src="https://img.shields.io/npm/dm/slide-verify?style=flat-square" alt="Downloads"/></a>

## Live Demo

<p align="center">
  <a href="https://blog.duandiwang.com/slide-verify/">
    <img width="315" src="https://blog.duandiwang.com/slide-verify/public/slide-verify-en.png">
  </a>
</p>

## Install

```shell
npm install slide-verify -S
```

## quick start

```js
import SlideVerify from '../dist/slide-verify'

let Slide = new SlideVerify({
  elementId: "root",
  lang: 'en', // set language English
  onSuccess: () => {console.log("success")},
  onFail: () => {console.log("fail")},
  onRefresh: () => {console.log("refresh")}
})
```

```html
<body>
    <div id="root"></div>
</body>
```

elementId for dom id

### Options

Name | Type | Require | default | description |
---|---|---|---|---
elementId | string | Yes | *null* | mount element dom id
photo | string or array | No | *null* | back ground image url or image url array
onSuccess | function | Yes | *null* | success callback
onFail | function | Yes | *null* | fail call back
onRefresh | function | Yes | *null* | refresh call back
source | array | No | *null* | [x, y, width, height] only work when you set photo，cut the image。x,y set cut from location，width, height set cut width and height，[example](https://github.com/mikexfreeze/slide-verify/issues/4#issuecomment-727855481)

## Featrue

1. css-module developed
2. UMD
3. support TypeScript

## Contribution

This project refers to the project [canvas滑动验证码](https://github.com/yeild/jigsaw)
