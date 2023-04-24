import clickSound from "/public/sounds/click.mp3";
import moveSound from "/public/sounds/move.mp3";
import attackSound from "/public/sounds/attack.mp3";
import cavaloSound from "/public/sounds/cavalo.mp3";
import { TPieceName } from "@/types";

export class ChessSound {
  public static playClickAudio = () => {
    const clickAudio = new Audio(clickSound);
    clickAudio.volume = 0.5;
    clickAudio.play();
  };

  public static playMoveAudio = () => {
    const moveAudio = new Audio(moveSound);
    moveAudio.play();
  };

  public static playAttackAudio = () => {
    const attackAudio = new Audio(attackSound);
    attackAudio.volume = 0.4;
    attackAudio.play();
  };

  public static playCavaloAudio = () => {
    const cavaloAudio = new Audio(cavaloSound);
    cavaloAudio.play();
  };

  public static playconditionalMoveAudio = (pieceName: TPieceName) => {
    if (pieceName === "Knight") {
      this.playCavaloAudio();
      return;
    }
    this.playMoveAudio();
  };
}
