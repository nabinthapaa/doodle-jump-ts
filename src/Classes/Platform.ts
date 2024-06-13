import { PLATFORM_HEIGHT, PLATFORM_WIDTH } from "../constants/GameConstants";
import { EnemySprite } from "../images/StartScreen";
import SpriteRenderer from "./SpriteRenderer";

export default class Platform {
  private width: number;
  private height: number;
  private image: HTMLImageElement;
  constructor(
    public x: number,
    public y: number,
    image: string = EnemySprite,
    width: number = PLATFORM_WIDTH,
    height: number = PLATFORM_HEIGHT
  ) {
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const render = new SpriteRenderer(this.image, this.width, this.height);
    render.drawFrame(ctx, 0, 0, this.x, this.y);
  }
}
