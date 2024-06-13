import Platform from "../Classes/Platform";
import Player from "../Classes/Player";
import SpriteRenderer from "../Classes/SpriteRenderer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";
import { images } from "../images/StartScreen";
import { GameSounds } from "../sfx/GameSounds";
import { TGameStates } from "../types/GameStates";
import { PlatformType } from "../types/Platform";
import { setHighScore } from "../utils/HighScores";

let keySet = new Set<string>();
let platforms: Platform[] = [];
const MAX_PLATFORMS = 10;

const StartScreen = () => {
  platforms.push(new Platform(CANVAS_WIDTH / 2 - 92 / 2, CANVAS_HEIGHT - 55));
};

const player = new Player("Doodle Jump", "/assets/playerSheet.png", 40);
const render = new SpriteRenderer(player.Image, 92, 92);
let currentPlayerFrame = 0;

export function GameLoop(
  ctx: CanvasRenderingContext2D,
  GameStates: TGameStates
) {
  if (GameStates.isGameOver) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(images.BackGround, 0, 0, 640, 1024, 0, 0, 640, 1024);

  drawPlatforms(ctx);
  checkCollision();

  if (player.getPosition.y > CANVAS_HEIGHT) GameStates.isGameOver = true;
  if (GameStates.isGameOver) {
    setHighScore(player.name, GameStates.score);
    GameStates.name = player.name;
    GameSounds.fall.play();
    player.resetPlayer();
    platforms = [];
    StartScreen();
    initializePlatform();
  }

  // Update player position on Key press
  updatePlayerPosition();
  movePlatformsAndRemovePlatforms(GameStates);

  player.applyGravity();

  if (player.onGround) {
    player.jump();
    if (player.y < CANVAS_HEIGHT / 4) {
      player.y = CANVAS_HEIGHT / 4;
    }
  }

  drawScore(ctx, GameStates.score);

  render.drawFrame(
    ctx,
    currentPlayerFrame,
    0,
    player.getPosition.x,
    player.getPosition.y
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

function drawPlatforms(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < platforms.length; i++) {
    switch (platforms[i].type) {
      case PlatformType.Moving:
        platforms[i].draw(ctx, 1);
        platforms[i].moveLeftRight();
        break;
      case PlatformType.Falling:
        platforms[i].draw(ctx, 4);
        if (platforms[i].isFalling) {
          platforms[i].fall();
        }
        break;
      case PlatformType.Invisible:
        platforms[i].draw(ctx, 3);
        break;
      default:
        platforms[i].draw(ctx, 0);
    }
  }
}

function checkCollision() {
  for (let i = 0; i < platforms.length; i++) {
    if (player.collidesWith(platforms[i]) && player.velocity >= 0) {
      player.y = platforms[i].y - 92;
      player.velocity = 0;
      switch (platforms[i].type) {
        case PlatformType.Falling:
          !platforms[i].isFalling && GameSounds.break.play();
          platforms[i].fall();
          platforms[i].isFalling = true;
          player.onGround = false;
          break;
        case PlatformType.Invisible:
          player.onGround = true;
          platforms[i].Width = 0;
          platforms[i].Height = 0;
          break;
        default:
          player.onGround = true;
          GameSounds.jump.play();
      }
      break;
    }
  }
}

function movePlatformsAndRemovePlatforms(GameStates: TGameStates) {
  if (player.getPosition.y <= CANVAS_HEIGHT / 2) {
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].y += CANVAS_HEIGHT / 2 - player.getPosition.y;
    }
    let intial = platforms.length;
    platforms = platforms.filter((platform) => platform.y < CANVAS_HEIGHT - 50);
    let final = platforms.length;
    GameStates.score +=
      (intial - final) * Math.floor(Math.random() * (10 - 5) + 5);
    // Add new platforms at the top if needed
    while (platforms.length < MAX_PLATFORMS) {
      if (GameStates.score > 150) {
        let seed = Math.random();
        if (seed > 0.8) {
          generatePlatform(PlatformType.Moving);
        } else if (seed > 0.5) {
          generatePlatform(PlatformType.Falling);
          generatePlatform(
            PlatformType.Normal,
            150,
            400,
          );
        } else if (seed > 0.3) {
          generatePlatform(PlatformType.Invisible);
        }
      }
      if (platforms.length < MAX_PLATFORMS) generatePlatform();
    }
    player.y = CANVAS_HEIGHT / 2;
  }
}

function drawScore(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.roundRect(0, 0, 180 + Math.log10(score + 1) * 15, 50, 25);
  ctx.fill();
  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 25, 35);
}

function generatePlatform(
  type: PlatformType = PlatformType.Normal,
  platformSpacing: number = 150,
  platformOffsetY: number = 200,
) {
  console.group("generatePlatform");
  let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
  console.log(platforms.length);
  const platform = new Platform(
    randomX,
    CANVAS_HEIGHT - platforms.length * platformSpacing - platformOffsetY,
    type
  );
  console.log(type, { randomX, y: platform.y });
  platforms.push(platform);
  console.groupEnd();
  return platform;
}

function updatePlayerPosition() {
  if (keySet.has("ArrowLeft")) {
    currentPlayerFrame = 0;
    player.moveLeft();
  } else if (keySet.has("ArrowRight")) {
    currentPlayerFrame = 1;
    player.moveRight();
  } else if (keySet.has(" ")) {
    if (player.onGround) player.jump();
  }
}

document.addEventListener("keydown", (e) => {
  keySet.add(e.key);
});

document.addEventListener("keyup", (e) => {
  keySet.delete(e.key);
});
