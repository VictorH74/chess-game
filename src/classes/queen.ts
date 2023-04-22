import { TPieceColor, TPieceName } from "@/types";
import { BasePiece } from "./base";
import { TSquare } from "@/components/BoardSquare";

export class QueenPiece extends BasePiece {
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

    // Check board on upper-left diagonal
    for (
      let i = selectedRow - 1, j = selectedCol - 1;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      const piece = board[i][j].piece;
      if (piece === null || piece.color !== this.color) {
        moves.push(`${i}-${j}`);
      }
      if (piece !== null) {
        break;
      }
    }

    // Check board on upper-right diagonal
    for (
      let i = selectedRow - 1, j = selectedCol + 1;
      i >= 0 && j < 8;
      i--, j++
    ) {
      const piece = board[i][j].piece;
      if (piece === null || piece.color !== this.color) {
        moves.push(`${i}-${j}`);
      }
      if (piece !== null) {
        break;
      }
    }

    // Check board on lower-left diagonal
    for (
      let i = selectedRow + 1, j = selectedCol - 1;
      i < 8 && j >= 0;
      i++, j--
    ) {
      const piece = board[i][j].piece;
      if (piece === null || piece.color !== this.color) {
        moves.push(`${i}-${j}`);
      }
      if (piece !== null) {
        break;
      }
    }

    // Check board on lower-right diagonal
    for (
      let i = selectedRow + 1, j = selectedCol + 1;
      i < 8 && j < 8;
      i++, j++
    ) {
      const piece = board[i][j].piece;
      if (piece === null || piece.color !== this.color) {
        moves.push(`${i}-${j}`);
      }
      if (piece !== null) {
        break;
      }
    }

    return moves;
  }
}
