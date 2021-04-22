
let l = 42, // 滑块边长
  r = 7.5, // 滑块半径
  svCanvasWidth = 310, // canvas宽度
  svCanvasHeight = 210, // canvas高度
  L = l + r * 2 + 9 // 滑块实际边长
const mobile = checkMobile()
function calcPixel() {
  if(mobile){
    svCanvasWidth = scalePixel(svCanvasWidth)
    svCanvasHeight = scalePixel(svCanvasHeight)
    l = scalePixel(l)
    r = scalePixel(r)
    L = scalePixel(L)
  }
}  

calcPixel()

function scalePixel(pixel: number) {
  // return pixel * window.devicePixelRatio / 1.5
  return pixel * 2
}

export function checkMobile(): boolean{
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    return true
  }else{
    // false for not mobile device
    return false
  }
}

export {
  l, // 滑块边长
  r, // 滑块半径
  svCanvasWidth, // canvas宽度
  svCanvasHeight, // canvas高度
  L, // 滑块实际边长
  mobile,
}
