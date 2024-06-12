import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";

export default class Player {
  private score: number = 0;
  private image: HTMLImageElement;
  private x: number = CANVAS_WIDTH / 2 - 92 / 2;
  private y: number = CANVAS_HEIGHT - 92;
  private width: number;
  private height: number;

  constructor(public name: string, image_url: string) {
    this.image = new Image();
    this.image.src = image_url;
    this.height = 92;
    this.width = 92;
  }

  get Score(): number {
    return this.score;
  }

  get Image(): HTMLImageElement {
    return this.image;
  }

  get PlayerCoordinates(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  get PlayerDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  public increaseScore(): void {
    this.score++;
  }

  public decreaseScore(): void {
    this.score--;
  }

  public resetScore(): void {
    this.score = 0;
  }

  public setPlayerImage(url: string) {
    this.image.src = url;
  }

  public moveLeft() {
    if (CANVAS_WIDTH / 2 - 92 / 2 - 10 < 0) return;
    this.x -= 10;
  }

  public moveRight() {
    if (CANVAS_WIDTH / 2 - 92 / 2 + 10 > CANVAS_WIDTH) return;
    this.x += 10;
  }
}
