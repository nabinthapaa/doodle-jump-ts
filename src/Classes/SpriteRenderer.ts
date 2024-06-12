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

  public draw(ctx: CanvasRenderingContext2D, canvasX: number, canvasY: number) {
    ctx.drawImage(this.image, canvasX, canvasY);
  }

  public drawTile(
    ctx: CanvasRenderingContext2D,
    tileX: number,
    tileY: number,
    canvasX: number,
    canvasY: number
  ) {
    ctx.drawImage(
      this.image,
      tileX * this.width,
      tileY * this.height,
      this.width,
      this.height,
      canvasX,
      canvasY,
      this.width,
      this.height
    );
  }

  public drawTileScaled(
    ctx: CanvasRenderingContext2D,
    tileX: number,
    tileY: number,
    canvasX: number,
    canvasY: number,
    width: number,
    height: number
  ) {
    ctx.drawImage(
      this.image,
      tileX * this.width,
      tileY * this.height,
      this.width,
      this.height,
      canvasX,
      canvasY,
      width,
      height
    );
  }

  public drawTileScaledRotated(
    ctx: CanvasRenderingContext2D,
    tileX: number,
    tileY: number,
    canvasX: number,
    canvasY: number,
    width: number,
    height: number,
    angle: number
  ) {
    ctx.save();
    ctx.translate(canvasX + width / 2, canvasY + height / 2);
    ctx.rotate(angle);
    ctx.drawImage(
      this.image,
      tileX * this.width,
      tileY * this.height,
      this.width,
      this.height,
      -width / 2,
      -height / 2,
      width,
      height
    );
    ctx.restore();
  }

  public drawTileRotated(
    ctx: CanvasRenderingContext2D,
    tileX: number,
    tileY: number,
    canvasX: number,
    canvasY: number,
    angle: number
  ) {
    ctx.save();
    ctx.translate(canvasX + this.width / 2, canvasY + this.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(
      this.image,
      tileX * this.width,
      tileY * this.height,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  public drawFrameRotated(
    ctx: CanvasRenderingContext2D,
    frameX: number,
    frameY: number,
    canvasX: number,
    canvasY: number,
    angle: number
  ) {
    ctx.save();
    ctx.translate(canvasX + this.width / 2, canvasY + this.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(
      this.image,
      frameX * this.width,
      frameY * this.height,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  public drawFrameScaled(
    ctx: CanvasRenderingContext2D,
    frameX: number,
    frameY: number,
    canvasX: number,
    canvasY: number,
    width: number,
    height: number
  ) {
    ctx.drawImage(
      this.image,
      frameX * this.width,
      frameY * this.height,
      this.width,
      this.height,
      canvasX,
      canvasY,
      width,
      height
    );
  }
}
