import { BasePiece } from "./base";
import { TPieceColor, TPieceName, TSquare } from "@/types";

export class RookPiece extends BasePiece {
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

    // RIGHT
    for (let col = selectedCol; col < 7; col++) {
      if (
        !board[selectedRow][col + 1].piece ||
        board[selectedRow][col + 1].piece?.color !== this.color ||
        (board[selectedRow][col + 1].piece?.color === this.color &&
          includeLastSameColor)
      )
        moves.push(`${selectedRow}-${col + 1}`);
      if (!board[selectedRow][col + 1].piece) continue;
      break;
    }

    // LEFT
    for (let col = selectedCol; col > 0; col--) {
      if (
        !board[selectedRow][col - 1].piece ||
        board[selectedRow][col - 1].piece?.color !== this.color ||
        (board[selectedRow][col - 1].piece?.color === this.color &&
          includeLastSameColor)
      )
        moves.push(`${selectedRow}-${col - 1}`);
      if (!board[selectedRow][col - 1].piece) continue;
      break;
    }

    // UP
    for (let row = selectedRow; row < 7; row++) {
      if (
        !board[row + 1][selectedCol].piece ||
        board[row + 1][selectedCol].piece?.color !== this.color ||
        (board[row + 1][selectedCol].piece?.color === this.color &&
          includeLastSameColor)
      )
        moves.push(`${row + 1}-${selectedCol}`);
      if (!board[row + 1][selectedCol].piece) continue;
      break;
    }

    // DOWN
    for (let row = selectedRow; row > 0; row--) {
      if (
        !board[row - 1][selectedCol].piece ||
        board[row - 1][selectedCol].piece?.color !== this.color ||
        (board[row - 1][selectedCol].piece?.color === this.color &&
          includeLastSameColor)
      )
        moves.push(`${row - 1}-${selectedCol}`);
      if (!board[row - 1][selectedCol].piece) continue;
      break;
    }

    return moves;
  }
}
