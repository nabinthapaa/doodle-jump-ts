import { GameLoop } from "./Screens/GameScreen";
import { drawStartScreen } from "./Screens/StartScreen";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/Canvas";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "./constants/SpriteConstants";
import "./style.css";
import { isButtonClicked } from "./utils/isButtonClicked";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let is_play_button_clicked = true;
let on_start_screen = false;

canvas.addEventListener("click", (e) => {
  if (!on_start_screen) return;
  is_play_button_clicked = isButtonClicked(
    111,
    217,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    e.offsetX,
    e.offsetY
  );
});
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;

let lastTime = 0;

function draw(currentTime: number = 0) {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= FRAME_DURATION) {
    lastTime = currentTime - (deltaTime % FRAME_DURATION); // Adjust the lastTime to avoid drift

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (is_play_button_clicked && !on_start_screen) {
      GameLoop(ctx);
    } else {
      drawStartScreen(ctx);
    }
  }
  requestAnimationFrame(draw);
}

window.onload = () => {
  draw();
};
