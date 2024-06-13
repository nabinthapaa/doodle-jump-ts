import background from "/assets/background.png";
import doodleJumpImage from "/assets/doodle-jump.png";
import hole from "/assets/hole.png";
import play from "/assets/play.png";
import scores from "/assets/scores.png";
import start from "/start.png";

import { getImageSource } from "../utils/getImageSource";
import enemySprite from "/assets/enemySheet.png";
import playerSprite from "/assets/playerSheet.png";
import startEndSprite from "/assets/start-end-tile.png";

export const images = {
  BackGround: getImageSource(background),
  startEndSprite: getImageSource(startEndSprite),
  enemySprite: getImageSource(enemySprite),
  playerSprite: getImageSource(playerSprite),
  scores: getImageSource(scores),
  play: getImageSource(play),
  Hole: getImageSource(hole),
  doodleJump: getImageSource(doodleJumpImage),
  start: getImageSource(start),
  playGameButtonImage: getImageSource(play),
  scoreButtonImage: getImageSource(scores),
};
