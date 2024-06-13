export function getHighScore(name: string) {
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  highScores.sort((a: any, b: any) => b.score - a.score);
  const player = highScores.find((player: any) => player.name === name);
  return player?.score || 0;
}

export function getHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  return highScores;
}

export function setHighScore(name: string, score: number) {
  const id = name + Math.random() * 1678546877;
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  highScores.push({ name, score, id });
  highScores.sort((a: any, b: any) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
