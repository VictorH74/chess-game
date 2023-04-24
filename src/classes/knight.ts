import { TPieceColor, TPieceName, TSquare } from "@/types";
import { BasePiece } from "./base";

export class KnightPiece extends BasePiece {
  constructor(name: TPieceName, color: TPieceColor) {
    super(name, color);
  }

  possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
    includeLastSameColor?: boolean
  ) {
    let moves = [];
    const directions = [
      [-1, 2],
      [1, 2],
      [-1, -2],
      [1, -2],
      [-2, 1],
      [-2, -1],
      [2, 1],
      [2, -1],
    ];

    for (const [dirRow, dirCol] of directions) {
      const newRow = selectedRow + dirRow;
      const newCol = selectedCol + dirCol;

      if (
        newRow >= 0 &&
          newRow <= 7 &&
          newCol >= 0 &&
          newCol <= 7 &&
          (board[newRow][newCol].piece?.color !== this.color ||
        (board[newRow][newCol].piece?.color === this.color &&
          includeLastSameColor))
      ) {
        moves.push(`${newRow}-${newCol}`);
      }
    }

    return moves;
  }
}
