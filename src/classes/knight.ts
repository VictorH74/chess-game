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
  ) {
    let moves = [];

    if (
      // right-up
      selectedCol + 2 <= 7 &&
      selectedRow - 1 >= 0 &&
      board[selectedRow - 1][selectedCol + 2].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol + 2}`);
    }

    if (
      // right-down
      selectedCol + 2 <= 7 &&
      selectedRow + 1 <= 7 &&
      board[selectedRow + 1][selectedCol + 2].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol + 2}`);
    }

    if (
      // left-up
      selectedCol - 2 >= 0 &&
      selectedRow - 1 >= 0 &&
      board[selectedRow - 1][selectedCol - 2].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol - 2}`);
    }

    if (
      // left-down
      selectedCol - 2 >= 0 &&
      selectedRow + 1 <= 7 &&
      board[selectedRow + 1][selectedCol - 2].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol - 2}`);
    }

    if (
      // up-right
      selectedCol + 1 <= 7 &&
      selectedRow - 2 >= 0 &&
      board[selectedRow - 2][selectedCol + 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 2}-${selectedCol + 1}`);
    }

    if (
      // up-left
      selectedCol - 1 >= 0 &&
      selectedRow - 2 >= 0 &&
      board[selectedRow - 2][selectedCol - 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 2}-${selectedCol - 1}`);
    }

    if (
      // down - right
      selectedCol + 1 <= 7 &&
      selectedRow + 2 <= 7 &&
      board[selectedRow + 2][selectedCol + 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 2}-${selectedCol + 1}`);
    }

    if (
      // down-left
      selectedCol - 1 >= 0 &&
      selectedRow + 2 <= 7 &&
      board[selectedRow + 2][selectedCol - 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 2}-${selectedCol - 1}`);
    }

    return moves;
  }
}
