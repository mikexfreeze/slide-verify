declare module '*.png';

declare module "*.jpg" {
  const value: any;
  export = value;
}

interface img {
  name: string;
  x: Array<number>;
  y: Array<number>;
  type: string;
  mode: string;
}