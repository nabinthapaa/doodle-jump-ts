import SpriteRenderer from "../Classes/SpriteRenderer";
import { SCALE } from "../constants/GameConstants";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "../constants/SpriteConstants";
import { item_location, item_size } from "../constants/StartScreen";
import { images } from "../images/StartScreen";

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
    images.doodleJump,
    0,
    0,
    item_size.doodleJumpText.width,
    item_size.doodleJumpText.height,
    item_location.doodleJumpText.x,
    item_location.doodleJumpText.y,
    SCALE * item_size.doodleJumpText.width,
    SCALE * item_size.doodleJumpText.height
  );
}

function drawUfo(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(images.startEndSprite, 162, 248);
  render.drawFrame(ctx, 4, 0, item_location.ufo.x, item_location.ufo.y);
}

function drawButtons(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(
    images.playGameButtonImage,
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
    images.scoreButtonImage,
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
  const render = new SpriteRenderer(images.startEndSprite, 640, 166);
  render.drawFrame(
    ctx,
    0,
    2,
    0,
    ctx.canvas.height - item_size.bottomTornPart.height
  );
}

function drawPlatform(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(
    images.enemySprite,
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
  const render = new SpriteRenderer(images.playerSprite, 92, 92);
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
