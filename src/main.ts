import { drawEndScreen } from "./Screens/EndScreen";
import { GameLoop } from "./Screens/GameScreen";
import { drawStartScreen } from "./Screens/StartScreen";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/Canvas";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "./constants/SpriteConstants";
import "./style.css";
import { GameStates } from "./types/GameStates";
import { isButtonClicked } from "./utils/isButtonClicked";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const Game_States: GameStates = {
  on_start_screen: true,
  is_game_over: false,
  on_end_screen: false,
  score: 0,
  name: "",
};

canvas.addEventListener("click", (e) => {
  if (!Game_States.on_start_screen) return;
  const is_play_button_clicked = isButtonClicked(
    111,
    217,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    e.offsetX,
    e.offsetY
  );
  Game_States.on_start_screen = !is_play_button_clicked;
});

document.addEventListener("click", (e) => {
  if (Game_States.on_end_screen) {
    const is_play_again_clicked = isButtonClicked(
      210,
      650,
      BUTTON_WIDTH,
      BUTTON_HEIGHT,
      e.offsetX,
      e.offsetY
    );
    if (is_play_again_clicked) {
      location.reload();
    }
  }
});

const FPS = 60;
const FRAME_DURATION = 1000 / FPS;
let lastTime = 0;

function draw(currentTime: number = 0) {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= FRAME_DURATION) {
    lastTime = currentTime - (deltaTime % FRAME_DURATION); // Adjust the lastTime to avoid drift

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!Game_States.on_start_screen && !Game_States.is_game_over) {
      GameLoop(ctx, Game_States);
    } else if (Game_States.is_game_over) {
      Game_States.on_end_screen = true;
      Game_States.on_start_screen = false;
      drawEndScreen(ctx, Game_States);
    } else {
      drawStartScreen(ctx);
    }
  }
  requestAnimationFrame(draw);
}

window.onload = () => {
  draw();
};
