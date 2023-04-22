import { TPieceColor, TPieceName } from "@/types";
import { BishopPiece } from "./bishop";
import { KingPiece } from "./king";
import { KnightPiece } from "./knight";
import { PawnPiece } from "./pawn";
import { QueenPiece } from "./queen";
import { RookPiece } from "./rook";
import { TSquare } from "@/components/BoardSquare";

export type TPieceClass = RookPiece | KnightPiece | BishopPiece | QueenPiece | KingPiece | PawnPiece

export class BasePiece {
  name: TPieceName;
  color: TPieceColor;

  constructor(name: TPieceName, color: TPieceColor) {
    this.name = name;
    this.color = color;
  }

  public possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
  ) {
    throw new Error("Abstract Method has no implementation");
  }
}
