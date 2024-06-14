import { getAudio } from "../utils/getAudio";

export const GameSounds = {
    jump: getAudio("/sfx/jump.wav"),
    fall: getAudio("/sfx/falling-sound-arcade.mp3"),
    break: getAudio("/sfx/lomise.mp3"),
    invisible: getAudio("/sfx/wing-flap.mp3"),
    start: getAudio("/sfx/start.wav"),
}