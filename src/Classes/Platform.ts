import { CANVAS_WIDTH } from "../constants/Canvas";
import { PLATFORM_HEIGHT, PLATFORM_WIDTH } from "../constants/GameConstants";
import { images } from "../images/StartScreen";
import { PlatformType } from "../types/Platform";
import SpriteRenderer from "./SpriteRenderer";

export default class Platform {
  private width: number;
  private height: number;
  private velocity: number = 5;
  constructor(
    public x: number,
    public y: number,
    public type: PlatformType = PlatformType.Normal,
    public isFalling: boolean = false,
    public image: HTMLImageElement = images.enemySprite,
    width: number = PLATFORM_WIDTH,
    height: number = PLATFORM_HEIGHT
  ) {
    this.width = width;
    this.height = height;
  }

  set Width(width: number) {
    this.width = width;
  }

  set Height(height: number) {
    this.height = height;
  }

  public draw(ctx: CanvasRenderingContext2D, frameY: number) {
    const render = new SpriteRenderer(this.image, this.width, this.height);
    render.drawFrame(ctx, 0, frameY, this.x, this.y);
  }

  public drawFrom(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.drawImage(
      this.image,
      x,
      y,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  public moveLeftRight() {
    if (this.type !== PlatformType.Moving) return;
    if (this.x + this.width >= CANVAS_WIDTH) {
      this.velocity *= -1;
    }
    if (this.x <= 10) {
      this.velocity *= -1;
    }
    this.x += this.velocity;
  }

  public fall() {
    if (this.type !== PlatformType.Falling) return;
    this.y += this.velocity;
  }
}
