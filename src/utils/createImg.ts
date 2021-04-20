import {getRandomNumberByRange} from './utils'
import ImgArray from '../img'

/**
 * 设置 img src
 * @params
 * @onload img onload 时的回调函数
 */
export default function createImg(onload: ((this: GlobalEventHandlers, ev: Event) => any), src: string | string[] | undefined) {
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