import { drawEndScreen } from "./Screens/EndScreen";
import { GameLoop } from "./Screens/GameScreen";
import { drawStartScreen } from "./Screens/StartScreen";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/Canvas";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "./constants/SpriteConstants";
import "./style.css";
import { TGameStates } from "./types/GameStates";
import { isButtonClicked } from "./utils/isButtonClicked";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const GameStates: TGameStates = {
  isOnStartScreen: true,
  isGameOver: false,
  isOnEndScreen: false,
  score: 0,
  name: "",
};

canvas.addEventListener("click", (e) => {
  if (!GameStates.isOnStartScreen) return;
  const isPlayButtonClicked = isButtonClicked(
    111,
    217,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    e.offsetX,
    e.offsetY
  );
  GameStates.isOnStartScreen = !isPlayButtonClicked;
});

document.addEventListener("click", (e) => {
  const isPlayAgainButtonClicked = isButtonClicked(
    210,
    650,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    e.offsetX,
    e.offsetY
  );
  if (!GameStates.isOnEndScreen) return;
  GameStates.isGameOver = !isPlayAgainButtonClicked;
  GameStates.isOnEndScreen = !isPlayAgainButtonClicked;
  GameStates.isOnStartScreen = !isPlayAgainButtonClicked;
  GameStates.score = 0;
});

const FPS = 60;
const FRAME_DURATION = 1000 / FPS;
let lastTime = 0;

function draw(currentTime: number = 0) {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= FRAME_DURATION) {
    lastTime = currentTime - (deltaTime % FRAME_DURATION); // Adjust the lastTime to avoid drift

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!GameStates.isOnStartScreen && !GameStates.isGameOver) {
      GameLoop(ctx, GameStates);
    } else if (GameStates.isGameOver) {
      GameStates.isOnEndScreen = true;
      GameStates.isOnStartScreen = false;
      drawEndScreen(ctx, GameStates);
    } else {
      drawStartScreen(ctx);
    }
  }
  requestAnimationFrame(draw);
}

window.onload = () => {
  draw();
};
