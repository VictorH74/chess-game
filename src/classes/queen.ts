import { TPieceColor, TPieceName, TSquare } from "@/types";
import { BasePiece } from "./base";

export class QueenPiece extends BasePiece {
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
    // RIGHT
    for (let col = selectedCol; col < 7; col++) {
      const piece = board[selectedRow][col + 1].piece

      if (!piece || piece?.color !== this.color ||
        (piece?.color === this.color && includeLastSameColor)
      )
        moves.push(`${selectedRow}-${col + 1}`);

      if (!piece) continue;
      break;
    }

    // LEFT
    for (let col = selectedCol; col > 0; col--) {
      const piece = board[selectedRow][col - 1].piece

      if (!piece || piece?.color !== this.color ||
        (piece?.color === this.color && includeLastSameColor)
      )
        moves.push(`${selectedRow}-${col - 1}`);

      if (!piece) continue;
      break;
    }

    // UP
    for (let row = selectedRow; row < 7; row++) {
      const piece = board[row + 1][selectedCol].piece

      if (!piece || piece?.color !== this.color ||
        (piece?.color === this.color && includeLastSameColor)
      )
        moves.push(`${row + 1}-${selectedCol}`);

      if (!piece) continue;
      break;
    }

    // DOWN
    for (let row = selectedRow; row > 0; row--) {
      const piece = board[row - 1][selectedCol].piece

      if (!piece || piece?.color !== this.color ||
        (piece?.color === this.color && includeLastSameColor)
      )
        moves.push(`${row - 1}-${selectedCol}`);

      if (!piece) continue;
      break;
    }

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