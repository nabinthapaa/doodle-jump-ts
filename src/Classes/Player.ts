import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";
import { PLATFORM_HEIGHT, PLATFORM_WIDTH } from "../constants/GameConstants";
import Platform from "./Platform";

export default class Player {
  private score: number = 0;
  private image: HTMLImageElement;
  public x: number = CANVAS_WIDTH / 2 - 92 / 2;
  public y: number = CANVAS_HEIGHT - 200;
  private width: number;
  private height: number;
  public gravity: number = 0.4;
  public onGround: boolean = true;
  public jumpStrength: number = -12;
  public gameOver: boolean = false;

  constructor(
    public name: string,
    image_url: string,
    public velocity: number = 0
  ) {
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
    this.x -= 5;
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH;
  }

  public moveRight() {
    this.x += 5;
    if (this.x > CANVAS_WIDTH) this.x = 0;
  }

  public applyGravity() {
    if (!this.onGround) {
      this.velocity += this.gravity;
      this.y += this.velocity;

      if (this.y + this.height >= CANVAS_HEIGHT) {
        this.y = CANVAS_HEIGHT + this.height;
        this.velocity = 0;
        this.gameOver = true
        this.onGround = true;
      }
    }
  }

  public jump() {
    if (this.onGround) {
      this.velocity = this.jumpStrength;
      this.y += this.velocity;
      this.onGround = false;

      if (this.y + this.height < 0) {
        this.y = 0;
      }
    }
  }

  public collidesWith(platform: Platform): boolean {
    return (
      this.PlayerCoordinates.y + 92 > platform.y &&
      this.PlayerCoordinates.y + 92 < platform.y + PLATFORM_HEIGHT &&
      this.PlayerCoordinates.x + 92 > platform.x &&
      this.PlayerCoordinates.x < platform.x + PLATFORM_WIDTH
    );
  }
}
