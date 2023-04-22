import { TPieceColor, TPieceName } from "@/types";
import { BasePiece } from "./base";
import { TSquare } from "@/components/BoardSquare";

export class BishopPiece extends BasePiece {
  constructor(name: TPieceName, color: TPieceColor) {
    super(name, color);
  }

  possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
  ) {
    let moves = [];

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
