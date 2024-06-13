import Platform from "../Classes/Platform";
import Player from "../Classes/Player";
import SpriteRenderer from "../Classes/SpriteRenderer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";
import { PLATFORM_HEIGHT } from "../constants/GameConstants";
import { InitialPlatform } from "../images/GameScreen";
import { BackGround } from "../images/StartScreen";
import { getImageSource } from "../utils/getImageSource";

const images = {
  BackGround: getImageSource(BackGround),
};

let key_sets = new Set<string>();
let platforms: Platform[] = [];
const MAX_PLATFORMS = 7;

const StartScreen = () => {
  platforms.push(
    new Platform(0, CANVAS_HEIGHT - 55, InitialPlatform, 640, 143)
  );
};

const player = new Player("Doodle Jump", "/assets/playerSheet.png", 40);
const render = new SpriteRenderer(player.Image, 92, 92);
let current_player_franme = 0;
let gameOver = false;

export function GameLoop(ctx: CanvasRenderingContext2D) {
  if (gameOver) location.reload();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(images.BackGround, 0, 0, 640, 1024, 0, 0, 640, 1024);

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw(ctx);
  }

  for (let i = 0; i < platforms.length; i++) {
    if (player.collidesWith(platforms[i]) && player.velocity >= 0) {
      console.log("Collided");
      player.onGround = true;
      player.y = platforms[i].y - 92;
      player.velocity = 0;
      break;
    }
  }

  if (player.PlayerCoordinates.y > CANVAS_HEIGHT + 92) {
    gameOver = true;
  }
  player.applyGravity();
  if (player.onGround) {
    player.jump();
  }
  update();

  // when player is at the middle of canvas move the canvas down and add the platform on tiop
  if (player.PlayerCoordinates.y <= CANVAS_HEIGHT / 2) {
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].y += 5;
    }
    platforms = platforms.filter((platform) => platform.y < CANVAS_HEIGHT);

    // Add new platforms at the top if needed
    while (platforms.length < MAX_PLATFORMS) {
      let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
      const platform = new Platform(randomX, -PLATFORM_HEIGHT);
      platforms.push(platform);
    }
  }

  render.drawFrame(
    ctx,
    current_player_franme,
    0,
    player.PlayerCoordinates.x,
    player.PlayerCoordinates.y
  );
}

function initializePlatform() {
  for (let i = 0; i < MAX_PLATFORMS - 1; i++) {
    let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
    const platform = new Platform(randomX, CANVAS_HEIGHT - i * 150 - 200);
    platforms.push(platform);
  }
}
StartScreen();
initializePlatform();

function update() {
  if (key_sets.has("ArrowLeft")) {
    current_player_franme = 0;
    player.moveLeft();
  } else if (key_sets.has("ArrowRight")) {
    current_player_franme = 1;
    player.moveRight();
  } else if (key_sets.has(" ")) {
    if (player.onGround) player.jump();
  }
}

document.addEventListener("keydown", (e) => {
  key_sets.add(e.key);
});

document.addEventListener("keyup", (e) => {
  key_sets.delete(e.key);
});
