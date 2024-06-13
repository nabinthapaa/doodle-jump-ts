import BackGround from "/assets/background.png";
import doodle_jump from "/assets/doodle-jump.png";
import hole from "/assets/hole.png";
import play from "/assets/play.png";
import scores from "/assets/scores.png";
import start from "/start.png";

import StartEndSprite from "/assets/start-end-tile.png";
import EnemySprite from "/assets/enemySheet.png";
import PlayerSprite from "/assets/playerSheet.png";
import { getImageSource } from "../utils/getImageSource";

export const images = {
    BackGround: getImageSource(BackGround),
    Start_End_Sprite: getImageSource(StartEndSprite),
    Enemy_Sprite: getImageSource(EnemySprite),
    Player_Sprite: getImageSource(PlayerSprite),
    scores: getImageSource(scores),
    play: getImageSource(play),
    Hole: getImageSource(hole),
    Doodle_Jump: getImageSource(doodle_jump),
    start: getImageSource(start),
    Play_Button_Image: getImageSource(play),
    Score_Button_Image: getImageSource(scores),
}