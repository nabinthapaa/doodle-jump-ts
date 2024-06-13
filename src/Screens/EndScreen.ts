import { SCALE } from "../constants/GameConstants";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "../constants/SpriteConstants";
import { Play_Again } from "../images/EndScreen";
import { images } from "../images/StartScreen";
import { GameStates } from "../types/GameStates";
import { getHighScore } from "../utils/HighScores";

function drawGameOverLabels(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    images.Start_End_Sprite,
    0,
    201,
    430,
    160,
    30,
    80,
    SCALE * 430,
    SCALE * 160
  );

  ctx.drawImage(
    images.Start_End_Sprite,
    786,
    315,
    240,
    60,
    80,
    250,
    SCALE * 240,
    SCALE * 60
  );

  ctx.drawImage(
    images.Start_End_Sprite,
    674,
    392,
    335,
    60,
    80,
    350,
    SCALE * 335,
    SCALE * 60
  );

  ctx.drawImage(
    images.Start_End_Sprite,
    703,
    464,
    235,
    60,
    80,
    450,
    SCALE * 235,
    SCALE * 60
  );
}

function drawScore(
  ctx: CanvasRenderingContext2D,
  score: number,
  name: string,
  highScore: number
) {
  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(`${score}`, 320, 300);

  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(`${highScore}`, 410, 385);

  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(name, 320, 480);
}


export function drawPlayAgainButton(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    Play_Again,
    0,
    0,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    210,
    650,
    SCALE * BUTTON_WIDTH,
    SCALE * BUTTON_HEIGHT
  );
}

export function drawEndScreen(
  ctx: CanvasRenderingContext2D,
  Game_States: GameStates
) {
  const highScore = getHighScore(Game_States.name);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(images.BackGround, 0, 0, 640, 1024, 0, 0, 640, 1024);
  drawGameOverLabels(ctx);
  drawScore(ctx, Game_States.score, Game_States.name, highScore);
  drawPlayAgainButton(ctx);
}

