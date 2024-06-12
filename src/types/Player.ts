export type Player = {
    x: number;
    y: number;
    width: number;
    height: number;
    velocity: number;
    jumping: boolean;
    grounded: boolean;
    jumpStrength: number;
    gravity: number;
    sprite: HTMLImageElement;
}

