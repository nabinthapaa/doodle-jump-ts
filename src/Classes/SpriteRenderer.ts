import { SCALE } from "../constants/GameConstants";

export default class SpriteRenderer {
  x: number;
  y: number;
  cols: number;
  rows: number;

  constructor(
    public image: HTMLImageElement,
    public width: number,
    public height: number,
    public frameX: number = 0,
    public frameY: number = 0
  ) {
    this.x = 0;
    this.y = 0;
    this.cols = image.width / width;
    this.rows = image.height / height;
  }

  public drawFrame(
    ctx: CanvasRenderingContext2D,
    frameX: number,
    frameY: number,
    canvasX: number,
    canvasY: number
  ) {
    ctx.drawImage(
      this.image,
      frameX * this.width,
      frameY * this.height,
      this.width,
      this.height,
      canvasX,
      canvasY,
      SCALE * this.width,
      SCALE * this.height
    );
  }
}
