import { TPieceColor, TPieceName, TSquare } from "@/types";

export class BasePiece {
  name: TPieceName;
  color: TPieceColor;

  constructor(name: TPieceName, color: TPieceColor) {
    this.name = name;
    this.color = color;
  }

  public possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
  ) {
    throw new Error("Abstract Method has no implementation");
  }
}
