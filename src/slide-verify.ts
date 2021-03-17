/* create by Micheal Xiao 2019/7/19 15:56 */

import ImgArray from './img'
import './libs/fontawesome'
import * as styles from './main.css'
// const styles = require('./main.css');

const Verify = require('./Verify.pug');

interface params {
  elementId: string; 
  onSuccess(): void; 
  onFail(): void;
  onRefresh(): void; 
  lang?: string; 
  photo?: string | string[];
  source?: number[];
}

const l = 42, // 滑块边长
  r = 7.5, // 滑块半径
  w = 310, // canvas宽度
  h = 210, // canvas高度
  PI = Math.PI
const L = l + r * 2 + 9 // 滑块实际边长

function createCanvas(width?: number | undefined, height?: number | undefined){
  var canvas = document.createElement("canvas");
  canvas.width = width || w;
  canvas.height = height || h;
  return canvas.getContext("2d")
}

function getRandomNumberByRange(start: number, end: number) {
  return Math.round(Math.random() * (end - start) + start)
}

function createImg(onload: ((this: GlobalEventHandlers, ev: Event) => any) | null, src: string | string[] | undefined) {
  const img = new Image()
  img.crossOrigin = "Anonymous"
  img.onload = onload
  img.onerror = () => {
    img.src = getRandomImgSrc()
  }
  
  if(src){
    // 如果用户设置图片则使用
    if(typeof src === 'string'){
      img.src = src
    }else if(Array.isArray(src)){
      img.src = src[getRandomNumberByRange(0, src.length - 1)]
    }
  }else{
    img.src = getRandomImgSrc()
  }
  
  return img
}

function getRandomImgSrc() {
  return ImgArray[getRandomNumberByRange(0, 4)]
}


function createElement(tagName: any, className: any) {
  const elment = document.createElement(tagName)
  elment.className = className
  return elment
}

function addClass(tag: { classList: { add: (arg0: any) => void; }; }, className: string) {
  tag.classList.add(className)
}

function removeClass(tag: { classList: { remove: (arg0: any) => void; }; }, className: string) {
  tag.classList.remove(className)
}


function drawPiece(ctx: CanvasRenderingContext2D, x: number, y: number){
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
  ctx.lineTo(x + l, y)
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
  ctx.lineTo(x + l, y + l)
  ctx.lineTo(x, y + l)
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
  ctx.lineTo(x, y)
  ctx.stroke()
}

function drawPieceInsideShadow(ctx: { drawImage: (arg0: HTMLCanvasElement, arg1: number, arg2: number) => void; }, x: any, y: any){
  // 第一步生成一个 piece 图形模板
  let piece = document.createElement("canvas");
  piece.width = w
  piece.height = h
  let pieceCtx = <CanvasRenderingContext2D>piece.getContext("2d");
  pieceCtx.fillStyle = "white";
  
  drawPiece(pieceCtx, x, y)
  pieceCtx.lineWidth = 1
  pieceCtx.strokeStyle = 'rgba(0, 0, 0, 1)'
  pieceCtx.stroke()
  pieceCtx["clip"]()
  // document.body.appendChild(piece);
  
  // 第二步生成 piece 外围黑边准备用于内投影
  var hole = document.createElement("canvas");
  var holeContext = <CanvasRenderingContext2D>hole.getContext("2d");
  hole.width = w
  hole.height = h
  
  //first, I draw a big black rect
  holeContext.fillStyle = "#000000";
  holeContext.fillRect(0,0,w,h)
  //then I use the image to make an hole in it
  holeContext.globalCompositeOperation = "xor";
  
  drawPiece(holeContext, x, y)
  holeContext.lineWidth = 0
  holeContext.fill()
  
  // 第三步生成内shadow
  var shadow = document.createElement("canvas");
  var shadowContext = <CanvasRenderingContext2D>shadow.getContext("2d");
  shadow.width = w;
  shadow.height = h;
  shadowContext.filter = "drop-shadow(0px 0px " +  "5px #000000 ) ";
  
  // 默认 source-over 模式下叠加阴影，destination-out 模式...
  for (let i = 0; i < 4; i++) {
    shadowContext.drawImage(hole, 0, 0);
  }
  shadowContext.globalCompositeOperation = "destination-out";
  shadowContext.drawImage(hole, 0, 0);
  
  // 第四步应用shadow
  ctx.drawImage(shadow, 0, 0)
}

function drawBlock(
    img: HTMLImageElement, 
    ctx: CanvasRenderingContext2D,
    x: number, 
    y: number) {
  // 第一步 生成包含图像的 piece 方块
  ctx.lineWidth = 0.5
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)'
  ctx.strokeStyle = 'rgba(253,255,29,0.7)'
  drawPiece(ctx, x, y)
  ctx.clip()
  ctx.globalCompositeOperation = 'source-over'
  
  // 设置图像及边长
  ctx.drawImage(img, 0, 0, w, h)
  const pieceY = y - r * 2 - 1
  const ImageData = ctx.getImageData(x - 3, pieceY, L, L)
  ctx.canvas.width = L
  ctx.putImageData(ImageData, 0, pieceY)
  
  // 第二步生成外shadow piece
  let shaodwCtx = <CanvasRenderingContext2D>createCanvas()
  shaodwCtx.canvas.width = L
  shaodwCtx.shadowColor = "black";
  shaodwCtx.shadowBlur = 6;
  shaodwCtx.shadowOffsetX = 2;
  shaodwCtx.shadowOffsetY = 5;
  drawPiece(shaodwCtx, 3, y)
  shaodwCtx.lineWidth = 1
  shaodwCtx.fillStyle = 'rgba(0, 0, 0, 1)'
  shaodwCtx.strokeStyle = 'rgba(0, 0, 0, 1)'
  shaodwCtx.stroke()
  shaodwCtx.fill()
  
  let compositeCtx = <CanvasRenderingContext2D>createCanvas()
  compositeCtx.canvas.width = L
  compositeCtx.drawImage(shaodwCtx.canvas, 0, 0)
  compositeCtx.drawImage(ctx.canvas, 0, 0)
  // document.body.appendChild(compositeCtx.canvas);
  
  ctx.drawImage(compositeCtx.canvas, 0, 0)
}

function sum(x: any, y: any) {
  return x + y
}

function square(x: number) {
  return x * x
}

export default class SlideVerify {
  el: HTMLElement;
  onFail: () => void;
  onSuccess: () => void;
  onRefresh: () => void;
  photo: string | string[] | undefined;
  source: number[] | undefined;
  x?: number;
  y?: number;
  canvasCtx: CanvasRenderingContext2D;
  blockCtx: CanvasRenderingContext2D;
  block: HTMLCanvasElement;
  img?: HTMLImageElement;
  refreshIcon: HTMLElement;
  slider: HTMLElement;
  canvas: HTMLCanvasElement;
  sliderContainer: HTMLElement;
  sliderMask: HTMLElement;
  sliderIcon: HTMLElement;
  text: HTMLElement;
  trail: number[];

  constructor({elementId, onSuccess, onFail, onRefresh, lang, photo, source}: params) {
    let intlText: {slideTips?: string} = {}
    if(lang && lang === 'en'){
      intlText = {slideTips: 'slide to right'}
    }else{
      intlText = {slideTips: '向右滑动填充拼图'}
    }
    let conEl = <HTMLElement>document.getElementById(elementId)
    conEl.innerHTML = Verify({slideTips: intlText.slideTips})
    let el = <ChildNode>conEl.firstChild
    let childNodes = el.childNodes
    this.el = el as HTMLElement
    this.onSuccess = onSuccess
    this.onFail = onFail
    this.onRefresh = onRefresh
    this.photo = photo
    if(photo){
      this.source = source
    }
    
    let canvas = childNodes[0] as HTMLCanvasElement
    let refreshIcon = childNodes[1] as HTMLElement
    let block = childNodes[2] as HTMLCanvasElement
    let sliderContainer = childNodes[3] as HTMLElement
    let sliderMask = sliderContainer.childNodes[0] as HTMLElement
    let text = sliderContainer.childNodes[1] as HTMLElement
    let slider = sliderMask.childNodes[0] as HTMLElement
    let sliderIcon = sliderMask.childNodes[0] as HTMLElement
    
    this.canvas = canvas
    this.block = block
    this.sliderContainer = sliderContainer
    this.refreshIcon = refreshIcon
    this.slider = slider
    this.sliderMask = sliderMask
    this.sliderIcon = sliderIcon
    this.text = text
    this.canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.blockCtx = block.getContext('2d') as CanvasRenderingContext2D
    this.trail = []

    this.initImg()
    this.bindEvents()
  }
  
  initImg() {
    const img = createImg(() => {
      // 随机创建滑块的位置
      this.x = getRandomNumberByRange(L + 70, w - (L + 10))
      this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
  
      // draw canvas 及 被抠出的 piece 留下的坑
      if(this.source){
        /* tsbug https://github.com/microsoft/TypeScript/issues/36133 */ 
        (this.canvasCtx.drawImage as any)(img, ...this.source, 0, 0, w, h)
      }else{
        this.canvasCtx.drawImage(img, 0, 0, w, h)
      }
      this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.35)'
      this.canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      drawPiece(this.canvasCtx, this.x, this.y)
      this.canvasCtx.fill()
      drawPieceInsideShadow(this.canvasCtx, this.x, this.y)

      drawBlock(img, this.blockCtx as CanvasRenderingContext2D, this.x, this.y)
    }, this.photo)
    this.img = img
  }
  
  clean(): void {
    (this.canvasCtx as CanvasRenderingContext2D).clearRect(0, 0, w, h);
    (this.blockCtx as CanvasRenderingContext2D).clearRect(0, 0, w, h);
    (this.block as HTMLCanvasElement).width = w
  }
  
  bindEvents() {
    this.el.onselectstart = () => false;
    (this.refreshIcon as HTMLElement).onclick = () => {
      this.reset()
      typeof this.onRefresh === 'function' && this.onRefresh()
    }
    
    let originX: number, originY: number, trail: number[] = [], isMouseDown = false
    
    const handleDragStart = function (e: MouseEvent | TouchEvent) {
      if(e instanceof MouseEvent){
        originX = e.clientX
        originY = e.clientY
      }else if(e instanceof TouchEvent){
        originX = e.touches[0].clientX
        originY = e.touches[0].clientY
      }
      isMouseDown = true
    }
    
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return false
      let eventX = 0;
      let eventY = 0;
      if(e instanceof MouseEvent){
        eventX = e.clientX
        eventY = e.clientY
      }else if(e instanceof TouchEvent){
        eventX = e.touches[0].clientX
        eventY = e.touches[0].clientY
      }
      const moveX = eventX - originX
      const moveY = eventY - originY
      if (moveX < 0 || moveX + 38 >= w) return false;
      (this.slider as HTMLElement).style.left = moveX + 'px'
      // const blockLeft = (w - 40 - 20) / (w - 40) * moveX
      const blockLeft = moveX;
      (this.block as HTMLCanvasElement).style.left = blockLeft + 'px'
      
      addClass(this.sliderContainer, styles.sliderContainer_active)
      this.sliderMask.style.width = moveX + 12 + 'px'
      trail.push(moveY)
    }
    
    const handleDragEnd = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return false
      isMouseDown = false
      let eventX = 0;
      if(e instanceof MouseEvent){
        eventX = e.clientX
      }else if(e instanceof TouchEvent){
        eventX = e.touches[0].clientX
      }
      if (eventX == originX) return false
      removeClass(this.sliderContainer, styles.sliderContainer_active)
      this.trail = trail
      const {spliced, verified} = this.verify()
      if (spliced) {
        if (verified) {
          (<HTMLElement>this.sliderIcon.childNodes[0]).innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>`
          addClass(this.sliderContainer, styles.sliderContainer_success)
          typeof this.onSuccess === 'function' && this.onSuccess()
        } else {
          addClass(this.sliderContainer, styles.sliderContainer_fail)
          this.text.innerHTML = '再试一次'
          this.reset()
        }
      } else {
        (<HTMLElement>this.sliderIcon.childNodes[0]).innerHTML = `<i class="fas fa-times" aria-hidden="true"></i>`
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
    const deviations = arr.map((x: number) => x - average)
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length)
    const left = parseInt(this.block.style.left)
    return {
      spliced: Math.abs(left - (<number>this.x)) < 10,
      verified: stddev !== 0, // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    }
  }
  
  reset() {
    this.sliderContainer.className = styles.sliderContainer;
    (<HTMLElement>this.sliderIcon.childNodes[0]).innerHTML = `<i class="fas fa-bars fa-rotate-90" aria-hidden="true"></i>`
    this.slider.style.left = '0'
    this.block.style.left = '0'
    this.sliderMask.style.width = '0'
    this.clean()
    this.initImg()
  }
}

(window as any).SlideVerify = SlideVerify