import { images } from "../images/StartScreen";
import { SCALE } from "../constants/GameConstants";
import { item_location, item_size } from "../constants/StartScreen";
import SpriteRenderer from "../Classes/SpriteRenderer";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "../constants/SpriteConstants";

function drawBackground(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    images.BackGround,
    0,
    0,
    640,
    1024,
    0,
    0,
    SCALE * ctx.canvas.width,
    SCALE * ctx.canvas.height
  );
}

function drawDoodleJump(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    images.Doodle_Jump,
    0,
    0,
    item_size.doodle_jump_text.width,
    item_size.doodle_jump_text.height,
    item_location.doodle_jump_text.x,
    item_location.doodle_jump_text.y,
    SCALE * item_size.doodle_jump_text.width,
    SCALE * item_size.doodle_jump_text.height
  );
}

function drawUfo(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(images.Start_End_Sprite, 162, 248);
  render.drawFrame(ctx, 4, 0, item_location.ufo.x, item_location.ufo.y);
}

function drawButtons(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    images.Play_Button_Image,
    0,
    0,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    111,
    217,
    SCALE * BUTTON_WIDTH,
    SCALE * BUTTON_HEIGHT
  );
  ctx.drawImage(
    images.Score_Button_Image,
    0,
    0,
    BUTTON_WIDTH,
    BUTTON_HEIGHT,
    164,
    388,
    SCALE * BUTTON_WIDTH,
    SCALE * BUTTON_HEIGHT
  );
}
function drawHole(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    images.Hole,
    0,
    0,
    item_size.hole.width,
    item_size.hole.height,
    item_location.hole.x,
    item_location.hole.y,
    SCALE * item_size.hole.width,
    SCALE * item_size.hole.height
  );
}

function drawTornPart(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(images.Start_End_Sprite, 640, 166);
  render.drawFrame(
    ctx,
    0,
    2,
    0,
    ctx.canvas.height - item_size.bottom_torn_part.height
  );
}

function drawPlatform(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(
    images.Enemy_Sprite,
    item_size.platform.width,
    item_size.platform.height
  );
  render.drawFrame(
    ctx,
    0,
    0,
    item_location.platform.x,
    item_location.platform.y
  );
}

function drawPlayer(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(images.Player_Sprite, 92, 92);
  render.drawFrame(ctx, 0, 0, 60, 490);
}

export function drawStartScreen(ctx: CanvasRenderingContext2D) {
  drawBackground(ctx);
  drawDoodleJump(ctx);
  drawUfo(ctx);
  drawHole(ctx);
  drawPlayer(ctx);
  drawTornPart(ctx);
  drawPlatform(ctx);
  drawButtons(ctx);
}
