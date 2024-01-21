import { TPieceColor, TPieceName, TSquare } from "@/types";
import { BasePiece } from "./base";

export class KingPiece extends BasePiece {
  constructor(name: TPieceName, color: TPieceColor) {
    super(name, color);
  }

  possibleMoves(board: TSquare[][], selectedRow: number, selectedCol: number) {
    let moves: `${number}-${number}`[] = [];

    const directions = [-1, 0, 1];

    for (const rowDirection of directions) {
      for (const colDirection of directions) {
        if (rowDirection === 0 && colDirection === 0) continue; // posição atual, não adiciona movimento
        const newRow = selectedRow + rowDirection;
        const newCol = selectedCol + colDirection;
        if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) continue; // fora do tabuleiro
        const piece = board[newRow][newCol].piece;
        if (!piece || piece.color !== this.color) {
          moves.push(`${newRow}-${newCol}`);
        }
      }
    }

    return moves;
  }
}
