import Platform from "../Classes/Platform";
import Player from "../Classes/Player";
import SpriteRenderer from "../Classes/SpriteRenderer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/Canvas";
import { PLATFORM_HEIGHT } from "../constants/GameConstants";
import { images } from "../images/StartScreen";
import { GameSounds } from "../sfx/GameSounds";
import { GameStates } from "../types/GameStates";
import { setHighScore } from "../utils/HighScores";


let key_sets = new Set<string>();
let platforms: Platform[] = [];
const MAX_PLATFORMS = 7;

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
    platforms[i].draw(ctx);
  }

  for (let i = 0; i < platforms.length; i++) {
    if (player.collidesWith(platforms[i]) && player.velocity >= 0) {
      console.log("Collided");
      GameSounds.jump.play();
      player.onGround = true;
      player.y = platforms[i].y - 92;
      player.velocity = 0;
      break;
    }
  }

  if (player.gameOver) {
    player.gameOver = false;
    setHighScore(player.name, Game_States.score);
    Game_States.name = player.name;
    GameSounds.fall.play();
    Game_States.is_game_over = true;
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
    let intial = platforms.length;
    platforms = platforms.filter((platform) => platform.y < CANVAS_HEIGHT);
    let final = platforms.length;
    Game_States.score += (intial - final) * Math.floor(Math.random() * 10);
    // Add new platforms at the top if needed
    while (platforms.length < MAX_PLATFORMS) {
      let randomX = Math.floor((Math.random() * CANVAS_WIDTH * 3) / 4);
      const platform = new Platform(randomX, -PLATFORM_HEIGHT);
      platforms.push(platform);
    }
  }

  // draw score at top left of canvas with rounded rectangle and blurred background
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
