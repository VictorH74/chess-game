import { TPieceColor, TPieceName, TSquare } from "@/types";
import { BasePiece } from "./base";

export class BishopPiece extends BasePiece {
  constructor(name: TPieceName, color: TPieceColor) {
    super(name, color);
  }

  possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
    includeLastSameColor?: boolean
  ) {
    let moves: `${number}-${number}`[] = [];

    // Check board on upper-left diagonal
    for (
      let row = selectedRow - 1, col = selectedCol - 1;
      row >= 0 && col >= 0;
      row--, col--
    ) {
      const piece = board[row][col].piece;
      if (
        piece === null ||
        piece.color !== this.color ||
        (piece.color === this.color && includeLastSameColor)
      ) {
        moves.push(`${row}-${col}`);
      }
      if (piece !== null) {
        break;
      }
    }

    // Check board on upper-right diagonal
    for (
      let row = selectedRow - 1, col = selectedCol + 1;
      row >= 0 && col < 8;
      row--, col++
    ) {
      const piece = board[row][col].piece;
      if (
        piece === null ||
        piece.color !== this.color ||
        (piece.color === this.color && includeLastSameColor)
      ) {
        moves.push(`${row}-${col}`);
      }
      if (piece !== null) {
        break;
      }
    }

    // Check board on lower-left diagonal
    for (
      let row = selectedRow + 1, col = selectedCol - 1;
      row < 8 && col >= 0;
      row++, col--
    ) {
      const piece = board[row][col].piece;
      if (
        piece === null ||
        piece.color !== this.color ||
        (piece.color === this.color && includeLastSameColor)
      ) {
        moves.push(`${row}-${col}`);
      }
      if (piece !== null) {
        break;
      }
    }

    // Check board on lower-right diagonal
    for (
      let row = selectedRow + 1, col = selectedCol + 1;
      row < 8 && col < 8;
      row++, col++
    ) {
      const piece = board[row][col].piece;
      if (
        piece === null ||
        piece.color !== this.color ||
        (piece.color === this.color && includeLastSameColor)
      ) {
        moves.push(`${row}-${col}`);
      }
      if (piece !== null) {
        break;
      }
    }

    return moves;
  }
}