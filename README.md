# slide-verify

> 滑动条验证插件


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
})
```
```html
<body>
    <div id="root"></div>
</body>
```
elementId 为挂载点的 dom id

## Live Demo



