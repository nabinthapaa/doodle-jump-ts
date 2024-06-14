import SpriteRenderer from "../Classes/SpriteRenderer";
import { SCALE } from "../constants/GameConstants";
import { BUTTON_HEIGHT, BUTTON_WIDTH } from "../constants/SpriteConstants";
import { itemLocation, itemSize } from "../constants/StartScreen";
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
    itemSize.doodleJumpText.width,
    itemSize.doodleJumpText.height,
    itemLocation.doodleJumpText.x,
    itemLocation.doodleJumpText.y,
    SCALE * itemSize.doodleJumpText.width,
    SCALE * itemSize.doodleJumpText.height
  );
}

function drawUfo(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(images.startEndSprite, 162, 248);
  render.drawFrame(ctx, 4, 0, itemLocation.ufo.x, itemLocation.ufo.y);
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
    itemSize.hole.width,
    itemSize.hole.height,
    itemLocation.hole.x,
    itemLocation.hole.y,
    SCALE * itemSize.hole.width,
    SCALE * itemSize.hole.height
  );
}

function drawTornPart(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(images.startEndSprite, 640, 166);
  render.drawFrame(
    ctx,
    0,
    2,
    0,
    ctx.canvas.height - itemSize.bottomTornPart.height
  );
}

function drawPlatform(ctx: CanvasRenderingContext2D) {
  const render = new SpriteRenderer(
    images.enemySprite,
    itemSize.platform.width,
    itemSize.platform.height
  );
  render.drawFrame(
    ctx,
    0,
    0,
    itemLocation.platform.x,
    itemLocation.platform.y
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
