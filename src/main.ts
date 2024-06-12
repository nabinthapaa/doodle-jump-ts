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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (is_play_button_clicked) {
    GameLoop(ctx);
  } else {
    drawStartScreen(ctx);
  }
  requestAnimationFrame(draw);
}

window.onload = () => {
  draw();
};
