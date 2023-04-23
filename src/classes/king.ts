import { TPieceColor, TPieceName, TSquare } from "@/types";
import { BasePiece } from "./base";

export class KingPiece extends BasePiece {
  constructor(name: TPieceName, color: TPieceColor) {
    super(name, color);
  }

  possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
  ) {
    let moves = [];

    // UP
    if (
      selectedRow - 1 >= 0 &&
      board[selectedRow - 1][selectedCol].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol}`);
    }

    // UP LEFT
    if (
      selectedRow - 1 >= 0 &&
      selectedCol - 1 >= 0 &&
      board[selectedRow - 1][selectedCol - 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol - 1}`);
    }

    // LEFT
    if (
      selectedCol - 1 >= 0 &&
      board[selectedRow][selectedCol - 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow}-${selectedCol - 1}`);
    }

    // DOWN LEFT
    if (
      selectedRow + 1 <= 7 &&
      selectedCol - 1 >= 0 &&
      board[selectedRow + 1][selectedCol - 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol - 1}`);
    }

    // DOWN
    if (
      selectedRow + 1 <= 7 &&
      board[selectedRow + 1][selectedCol].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol}`);
    }

    // DOWN RIGHT
    if (
      selectedRow + 1 <= 7 &&
      selectedCol + 1 <= 7 &&
      board[selectedRow + 1][selectedCol + 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol + 1}`);
    }

    // RIGHT
    if (
      selectedCol + 1 <= 7 &&
      board[selectedRow][selectedCol + 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow}-${selectedCol + 1}`);
    }

    // UP RIGHT
    if (
      selectedRow - 1 >= 0 &&
      selectedCol + 1 <= 7 &&
      board[selectedRow - 1][selectedCol + 1].piece?.color !== this.color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol + 1}`);
    }

    return moves;
  }
}
