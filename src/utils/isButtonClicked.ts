export function isButtonClicked(
  x: number,
  y: number,
  width: number,
  height: number,
  mouseX: number,
  mouseY: number
): boolean {
  return mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;
}
