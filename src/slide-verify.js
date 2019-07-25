/* create by Micheal Xiao 2019/7/19 15:56 */
import * as ImgArray from './img'
import styles from './main.css'

const Verify = require('./Verify.pug');

const l = 42, // 滑块边长
  r = 9, // 滑块半径
  w = 310, // canvas宽度
  h = 210, // canvas高度
  PI = Math.PI
const L = l + r * 2 + 3 // 滑块实际边长
const isIE = window.navigator.userAgent.indexOf('Trident') > -1

function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start)
}

function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function createImg(onload) {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = onload
  img.onerror = () => {
    img.setSrc(getRandomImgSrc())
  }
  
  img.setSrc = function (src) {
    if (isIE) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
      const xhr = new XMLHttpRequest()
      xhr.onloadend = function (e) {
        const file = new FileReader() // FileReader仅支持IE10+
        file.readAsDataURL(e.target.response)
        file.onloadend = function (e) {
          img.src = e.target.result
        }
      }
      xhr.open('GET', src)
      xhr.responseType = 'blob'
      xhr.send()
    } else img.src = src
  }
  
  img.setSrc(getRandomImgSrc())
  return img
}

function createElement(tagName, className) {
  const elment = document.createElement(tagName)
  elment.className = className
  return elment
}

function addClass(tag, className) {
  tag.classList.add(className)
}

function removeClass(tag, className) {
  tag.classList.remove(className)
}

function getRandomImgSrc() {
  // return '//picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 1084)
  return ImgArray[`Img${getRandomNumberByRange(0, 9)}`]
}

function drawPiece(ctx, x, y){
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
  ctx.lineTo(x + l, y)
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
  ctx.lineTo(x + l, y + l)
  ctx.lineTo(x, y + l)
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
  ctx.lineTo(x, y)
}

function drawDev(){
  // 第一步生成一个piece图形模板
  
  let piece = document.createElement("canvas");
  piece.width = 100
  piece.height = 100
  let pieceCtx = piece.getContext("2d");
  pieceCtx.fillStyle = "white";
  
  drawPiece(pieceCtx, 20, 20)
  
  pieceCtx.lineWidth = 1
  pieceCtx.strokeStyle = 'rgba(0, 0, 0, 1)'
  pieceCtx.stroke()
  pieceCtx["clip"]()
  
  document.body.appendChild(piece);
  
  // 第二部生成piece外围黑边准备用于内投影
  var hole = document.createElement("canvas");
  var holeContext = hole.getContext("2d");
  hole.width = 100
  hole.height = 100
  
  //first, I draw a big black rect
  holeContext.fillStyle = "#000000";
  holeContext.fillRect(0,0,100,100)
  //then I use the image to make an hole in it
  holeContext.globalCompositeOperation = "xor";
  
  drawPiece(holeContext, 20, 30)
  holeContext.lineWidth = 0
  // holeContext.strokeStyle = 'rgba(255, 255, 255, 1)'
  holeContext.fillStyle = "tranparent";
  holeContext.stroke()
  holeContext.fill()
  
  document.body.appendChild(hole);
  
  // 第三部生成内shadow
  var shadow = document.createElement("canvas");
  var shadowContext = shadow.getContext("2d");
  shadow.width = 100;
  shadow.height = 100;
  shadowContext.filter = "drop-shadow(0px 0px " +  "5px #000000 ) ";
  shadowContext.drawImage(hole, 0, 0);
  shadowContext.globalCompositeOperation = "destination-out";
  // shadowContext.drawImage(hole, -5, -5);
  
  document.body.appendChild(shadow);
  
  var shadowIn = document.createElement("canvas");
  var shadowInContext = shadow.getContext("2d");
  shadowInContext.drawImage(shadow, 0, 0)
  // drawPiece(shadowContext, 20, 30)
  // shadowContext.clip()
  // shadowContext.lineWidth = 0
  // shadowContext.fillStyle = "tranparent";
  // shadowContext.stroke()
  // shadowContext.fill()
  // shadowContext.globalCompositeOperation = "destination-in";
  document.body.appendChild(shadowIn);
  
  // 第四部截取shadow
}

function draw(ctx, x, y, operation) {
  // ctx.beginPath()
  // ctx.moveTo(x, y)
  // ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
  // ctx.lineTo(x + l, y)
  // ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
  // ctx.lineTo(x + l, y + l)
  // ctx.lineTo(x, y + l)
  // ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
  // ctx.lineTo(x, y)
  drawPiece(ctx, x, y)
  ctx.lineWidth = 0.5
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
  ctx.stroke()
  ctx[operation]()
  ctx.globalCompositeOperation = 'destination-over'
}

function sum(x, y) {
  return x + y
}

function square(x) {
  return x * x
}


export default class SlideVerify {
  constructor({elementId, onSuccess, onFail, onRefresh}) {
    let conEl = document.getElementById(elementId)
    conEl.innerHTML = Verify({name: 'Timothy'})
    let el = conEl.firstChild
    let childNodes = el.childNodes
    // el.style.position = 'relative'
    // el.style.width = w + 'px'
    // Object.assign(el.style, {
    //   position: 'relative',
    //   width: w + 'px',
    //   margin: '0 auto'
    // })
    this.el = el
    this.onSuccess = onSuccess
    this.onFail = onFail
    this.onRefresh = onRefresh
    
    console.log("childNodes", childNodes)
    let canvas = childNodes[0]
    let refreshIcon = childNodes[1]
    let block = childNodes[2]
    let sliderContainer = childNodes[3]
    let sliderMask = sliderContainer.childNodes[0]
    let text = sliderContainer.childNodes[1]
    let slider = sliderMask.childNodes[0]
    let sliderIcon = sliderMask.childNodes[0]
    
    Object.assign(this, {
      canvas,
      block,
      sliderContainer,
      refreshIcon,
      slider,
      sliderMask,
      sliderIcon,
      text,
      canvasCtx: canvas.getContext('2d'),
      blockCtx: block.getContext('2d')
    })
    
    this.initImg()
    this.bindEvents()
    
  }
  
  init = (elementId) => {
  
  }
  
  
  initImg() {
    const img = createImg(() => {
      this.draw()
      this.canvasCtx.drawImage(img, 0, 0, w, h)
      this.blockCtx.drawImage(img, 0, 0, w, h)
      const y = this.y - r * 2 - 1
      const ImageData = this.blockCtx.getImageData(this.x - 3, y, L, L)
      console.log("ImageData", ImageData)
      this.block.width = L
      this.blockCtx.putImageData(ImageData, 0, y)
    })
    this.img = img
  }
  
  draw() {
    // 随机创建滑块的位置
    this.x = getRandomNumberByRange(L + 10, w - (L + 10))
    this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
    draw(this.blockCtx, this.x, this.y, 'clip')
    draw(this.canvasCtx, this.x, this.y, 'fill')
    drawDev(this.canvasCtx, this.x, this.y)
  }
  
  clean() {
    this.canvasCtx.clearRect(0, 0, w, h)
    this.blockCtx.clearRect(0, 0, w, h)
    this.block.width = w
  }
  
  bindEvents() {
    this.el.onselectstart = () => false
    this.refreshIcon.onclick = () => {
      this.reset()
      typeof this.onRefresh === 'function' && this.onRefresh()
    }
    
    let originX, originY, trail = [], isMouseDown = false
    
    const handleDragStart = function (e) {
      originX = e.clientX || e.touches[0].clientX
      originY = e.clientY || e.touches[0].clientY
      isMouseDown = true
    }
    
    const handleDragMove = (e) => {
      if (!isMouseDown) return false
      const eventX = e.clientX || e.touches[0].clientX
      const eventY = e.clientY || e.touches[0].clientY
      const moveX = eventX - originX
      const moveY = eventY - originY
      if (moveX < 0 || moveX + 38 >= w) return false
      this.slider.style.left = moveX + 'px'
      const blockLeft = (w - 40 - 20) / (w - 40) * moveX
      this.block.style.left = blockLeft + 'px'
      
      addClass(this.sliderContainer, styles.sliderContainer_active)
      this.sliderMask.style.width = moveX + 'px'
      trail.push(moveY)
    }
    
    const handleDragEnd = (e) => {
      if (!isMouseDown) return false
      isMouseDown = false
      const eventX = e.clientX || e.changedTouches[0].clientX
      if (eventX == originX) return false
      removeClass(this.sliderContainer, styles.sliderContainer_active)
      this.trail = trail
      const {spliced, verified} = this.verify()
      if (spliced) {
        if (verified) {
          addClass(this.sliderContainer, styles.sliderContainer_success)
          typeof this.onSuccess === 'function' && this.onSuccess()
        } else {
          addClass(this.sliderContainer, styles.sliderContainer_fail)
          this.text.innerHTML = '再试一次'
          this.reset()
        }
      } else {
        addClass(this.sliderContainer, styles.sliderContainer_fail)
        typeof this.onFail === 'function' && this.onFail()
        setTimeout(() => {
          this.reset()
        }, 1000)
      }
    }
    this.slider.addEventListener('mousedown', handleDragStart)
    this.slider.addEventListener('touchstart', handleDragStart)
    this.block.addEventListener('mousedown', handleDragStart)
    this.block.addEventListener('touchstart', handleDragStart)
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
  }
  
  verify() {
    const arr = this.trail // 拖动时y轴的移动距离
    const average = arr.reduce(sum) / arr.length
    const deviations = arr.map(x => x - average)
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length)
    const left = parseInt(this.block.style.left)
    return {
      spliced: Math.abs(left - this.x) < 10,
      verified: stddev !== 0, // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    }
  }
  
  reset() {
    this.sliderContainer.className = styles.sliderContainer
    this.slider.style.left = 0
    this.block.style.left = 0
    this.sliderMask.style.width = 0
    this.clean()
    this.img.setSrc(getRandomImgSrc())
  }
}