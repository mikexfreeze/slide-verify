import { drawPiece } from './drawPiece'
import {L, r, svCanvasWidth, svCanvasHeight} from '../config'
import { createCanvas } from '../utils'


export function drawBlock(
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
ctx.drawImage(img, 0, 0, svCanvasWidth, svCanvasHeight)
const pieceY = y - r * 2 - 1
const ImageData = ctx.getImageData(x - 3, pieceY, L, L)
ctx.canvas.width = L
ctx.putImageData(ImageData, 0, pieceY)

// 第二步生成外shadow piece
let shaodwCtx = <CanvasRenderingContext2D>createCanvas(svCanvasWidth, svCanvasHeight)
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

let compositeCtx = <CanvasRenderingContext2D>createCanvas(svCanvasWidth, svCanvasHeight)
compositeCtx.canvas.width = L
compositeCtx.drawImage(shaodwCtx.canvas, 0, 0)
compositeCtx.drawImage(ctx.canvas, 0, 0)

ctx.drawImage(compositeCtx.canvas, 0, 0)
}