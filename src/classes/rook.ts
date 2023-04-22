import { TSquare } from "@/components/BoardSquare";
import { BasePiece } from "./base";
import { TPieceColor, TPieceName } from "@/types";

export class RookPiece extends BasePiece {
  constructor(name: TPieceName, color: TPieceColor) {
    super(name, color);
  }

  possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
  ) {
    let moves = [];

    // RIGHT
    for (let col = selectedCol; col < 7; col++) {
      if (!board[selectedRow][col + 1].piece) {
        moves.push(`${selectedRow}-${col + 1}`);
      } else if (board[selectedRow][col + 1].piece?.color === this.color) {
        break;
      } else if (board[selectedRow][col + 1].piece?.color !== this.color) {
        moves.push(`${selectedRow}-${col + 1}`);
        break;
      }
    }

    // LEFT
    for (let col = selectedCol; col > 0; col--) {
      if (!board[selectedRow][col - 1].piece) {
        moves.push(`${selectedRow}-${col - 1}`);
      } else if (board[selectedRow][col - 1].piece?.color === this.color) {
        break;
      } else if (board[selectedRow][col - 1].piece?.color !== this.color) {
        moves.push(`${selectedRow}-${col - 1}`);
        break;
      }
    }

    // UP
    for (let row = selectedRow; row < 7; row++) {
      if (!board[row + 1][selectedCol].piece) {
        moves.push(`${row + 1}-${selectedCol}`);
      } else if (board[row + 1][selectedCol].piece?.color === this.color) {
        break;
      } else if (board[row + 1][selectedCol].piece?.color !== this.color) {
        moves.push(`${row + 1}-${selectedCol}`);
        break;
      }
    }

    // DOWN
    for (let row = selectedRow; row > 0; row--) {
      if (!board[row - 1][selectedCol].piece) {
        moves.push(`${row - 1}-${selectedCol}`);
      } else if (board[row - 1][selectedCol].piece?.color === this.color) {
        break;
      } else if (board[row - 1][selectedCol].piece?.color !== this.color) {
        moves.push(`${row - 1}-${selectedCol}`);
        break;
      }
    }
    return moves;
  }
}
