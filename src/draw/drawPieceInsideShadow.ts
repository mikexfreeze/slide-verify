import { drawPiece } from './drawPiece'
import {svCanvasWidth, svCanvasHeight} from '../config'

export function drawPieceInsideShadow(ctx: { drawImage: (arg0: HTMLCanvasElement, arg1: number, arg2: number) => void; }, x: any, y: any){
  // 第一步生成一个 piece 图形模板
  let piece = document.createElement("canvas");
  piece.width = svCanvasWidth
  piece.height = svCanvasHeight
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
  hole.width = svCanvasWidth
  hole.height = svCanvasHeight
  
  //first, I draw a big black rect
  holeContext.fillStyle = "#000000";
  holeContext.fillRect(0,0,svCanvasWidth,svCanvasHeight)
  //then I use the image to make an hole in it
  holeContext.globalCompositeOperation = "xor";
  
  drawPiece(holeContext, x, y)
  holeContext.lineWidth = 0
  holeContext.fill()
  
  // 第三步生成内shadow
  var shadow = document.createElement("canvas");
  var shadowContext = <CanvasRenderingContext2D>shadow.getContext("2d");
  shadow.width = svCanvasWidth;
  shadow.height = svCanvasHeight;
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