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

    return moves;
  }
}