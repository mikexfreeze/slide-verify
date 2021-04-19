export default function createCanvas(width: number, height: number){
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d")
}