declare module '*.png';

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare interface window {
  SlideVerify: any;
}