import { PLATFORM_HEIGHT, PLATFORM_WIDTH } from "../constants/GameConstants";
import { images } from "../images/StartScreen";
import { PlatformType } from "../types/Platform";
import SpriteRenderer from "./SpriteRenderer";

export default class Platform {
  private width: number;
  private height: number;
  constructor(
    public x: number,
    public y: number,
    public type: PlatformType = PlatformType.Normal,
    public image: HTMLImageElement = images.Enemy_Sprite,
    width: number = PLATFORM_WIDTH,
    height: number = PLATFORM_HEIGHT,
  ) {
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const render = new SpriteRenderer(this.image, this.width, this.height);
    render.drawFrame(ctx, 0, 0, this.x, this.y);
    if(this.type === PlatformType.WithSpring){
      render.drawFrame(ctx, 1, 0, this.x, this.y);
    }
  }
}
