import Platform from "../Classes/Platform";
import Player from "../Classes/Player";
import SpriteRenderer from "../Classes/SpriteRenderer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";
import { images } from "../images/StartScreen";
import { GameSounds } from "../sfx/GameSounds";
import { GameStates } from "../types/GameStates";
import { PlatformType } from "../types/Platform";
import { setHighScore } from "../utils/HighScores";

let key_sets = new Set<string>();
let platforms: Platform[] = [];
const MAX_PLATFORMS = 10;

const StartScreen = () => {
  platforms.push(new Platform(CANVAS_WIDTH / 2 - 92 / 2, CANVAS_HEIGHT - 55));
};

const player = new Player("Doodle Jump", "/assets/playerSheet.png", 40);
const render = new SpriteRenderer(player.Image, 92, 92);
let current_player_franme = 0;

export function GameLoop(
  ctx: CanvasRenderingContext2D,
  Game_States: GameStates
) {
  if (Game_States.is_game_over) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(images.BackGround, 0, 0, 640, 1024, 0, 0, 640, 1024);

  for (let i = 0; i < platforms.length; i++) {
    switch (platforms[i].type) {
    case PlatformType.Moving:
      platforms[i].draw(ctx, 1);
      break;
    case PlatformType.Falling:
      platforms[i].draw(ctx, 4);
      if (platforms[i].isFalling) {
        platforms[i].fall();
      }
      break;
    case PlatformType.Invisible:
      platforms[i].draw(ctx, 3)
      break;
    default:
      platforms[i].draw(ctx, 0);
    }
  }

  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i].type === PlatformType.Moving) {
      platforms[i].moveLeftRight();
    }
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

  if (player.PlayerCoordinates.y > CANVAS_HEIGHT)
    Game_States.is_game_over = true;

  if (Game_States.is_game_over) {
    setHighScore(player.name, Game_States.score);
    Game_States.name = player.name;
    GameSounds.fall.play();
    Game_States.is_game_over = true;
    player.resetPlayer();
    platforms = [];
    StartScreen();
    initializePlatform();
  }

  // Update player position on Key press
  update();

  if (player.PlayerCoordinates.y <= CANVAS_HEIGHT / 2) {
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].y += CANVAS_HEIGHT / 2 - player.PlayerCoordinates.y;
    }
    let intial = platforms.length;
    platforms = platforms.filter((platform) => platform.y < CANVAS_HEIGHT - 50);
    let final = platforms.length;
    Game_States.score +=
      (intial - final) * Math.floor(Math.random() * (10 - 5) + 5);
    // Add new platforms at the top if needed
    while (platforms.length < MAX_PLATFORMS) {
      if (Game_States.score > 150) {
        let seed = Math.random();
        if (seed > 0.8) {
          console.log("Moving Platform");
          let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
          const platform = new Platform(
            randomX,
            CANVAS_HEIGHT - platforms.length * 150 - 200,
            PlatformType.Moving
          );

          platforms.push(platform);
        } else if (seed > 0.5) {
          let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
          const platform = new Platform(
            randomX,
            CANVAS_HEIGHT - platforms.length * 150 - 200,
            PlatformType.Falling
          );
          platforms.push(platform);
          const platform_normal = new Platform(
            randomX + 100,
            CANVAS_HEIGHT - platforms.length * 150 - 200 + 100
          );

          platforms.push(platform_normal);
        }else if(seed > 0.3){
          let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
          const platform = new Platform(
            randomX,
            CANVAS_HEIGHT - platforms.length * 150 - 200,
            PlatformType.Invisible,
          );
          platforms.push(platform);
        }
      }
      let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
      const platform = new Platform(
        randomX,
        CANVAS_HEIGHT - platforms.length * 150 - 200
      );
      platforms.push(platform);
    }
    player.y = CANVAS_HEIGHT / 2;
  }

  player.applyGravity();

  if (player.onGround) {
    player.jump();
    if (player.y < CANVAS_HEIGHT / 4) {
      player.y = CANVAS_HEIGHT / 4;
    }
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.roundRect(0, 0, 180 + Math.log10(Game_States.score + 1) * 15, 50, 25);
  ctx.fill();
  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${Game_States.score}`, 25, 35);

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
