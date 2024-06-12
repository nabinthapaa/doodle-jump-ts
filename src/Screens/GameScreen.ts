import Player from "../Classes/Player";
import SpriteRenderer from "../Classes/SpriteRenderer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";
import { InitialPlatform } from "../images/GameScreen";
import { getImageSource } from "../utils/getImageSource";

const images = {
  Initial_Platform: getImageSource(InitialPlatform),
};

let is_player_move_left = false;
let is_player_move_right = false;
let is_player_flying = false;

const StartScreen = (ctx: CanvasRenderingContext2D) => {
  ctx.drawImage(
    images.Initial_Platform,
    0,
    0,
    640,
    1024,
    0,
    CANVAS_HEIGHT - 55,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
};

export function GameLoop(ctx: CanvasRenderingContext2D) {
  StartScreen(ctx);
  const player = new Player("Doodle Jump", "/assets/playerSheet.png");
  const render = new SpriteRenderer(player.Image, 92, 92);
  render.drawFrame(
    ctx,
    0,
    0,
    player.PlayerCoordinates.x,
    player.PlayerCoordinates.y
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      console.log("moving left");
      player.moveLeft();
    } else if (e.key === "ArrowRight") {
      console.log("moving right");
      player.moveRight();
    }
  });
}

