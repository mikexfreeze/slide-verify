export declare class SlideVerify {
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
}