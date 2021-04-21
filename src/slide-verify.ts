/* create by Micheal Xiao 2019/7/19 15:56 */

import './libs/fontawesome'
import * as styles from './main.css'
import {L, r, svCanvasWidth, svCanvasHeight} from './config'
import { 
  getRandomNumberByRange,
  createImg,
  addClass,
  removeClass,
  sum,
  square,
} from './utils'
import {
  drawPiece,
  drawPieceInsideShadow,
  drawBlock,
} from './draw'

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
      this.x = getRandomNumberByRange(L + 70, svCanvasWidth - (L + 10))
      this.y = getRandomNumberByRange(10 + r * 2, svCanvasHeight - (L + 10))
  
      // draw canvas 及 被抠出的 piece 留下的坑
      if(this.source){
        /* tsbug https://github.com/microsoft/TypeScript/issues/36133 */ 
        (this.canvasCtx.drawImage as any)(img, ...this.source, 0, 0, svCanvasWidth, svCanvasHeight)
      }else{
        this.canvasCtx.drawImage(img, 0, 0, svCanvasWidth, svCanvasHeight)
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
    (this.canvasCtx as CanvasRenderingContext2D).clearRect(0, 0, svCanvasWidth, svCanvasHeight);
    (this.blockCtx as CanvasRenderingContext2D).clearRect(0, 0, svCanvasWidth, svCanvasHeight);
    (this.block as HTMLCanvasElement).width = svCanvasWidth
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
      if (moveX < 0 || moveX + 38 >= svCanvasWidth) return false;
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