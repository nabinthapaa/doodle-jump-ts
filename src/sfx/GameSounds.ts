import { getAudio } from "../utils/getAudio";

export const GameSounds = {
    jump: getAudio("/sfx/jump.wav"),
    fall: getAudio("/sfx/falling-sound-arcade.mp3"),
    break: getAudio("/sfx/bijeli.mp3"),
}