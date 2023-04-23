import { BasePiece } from "./classes/base";
import { BishopPiece } from "./classes/bishop";
import { KingPiece } from "./classes/king";
import { KnightPiece } from "./classes/knight";
import { PawnPiece } from "./classes/pawn";
import { QueenPiece } from "./classes/queen";
import { RookPiece } from "./classes/rook";

type TSquare = {
  piece: TPieceClass | null;
  position: TPosition;
};

type TPosition = { row: number; col: number };

type TPieceClass =
  | RookPiece
  | KnightPiece
  | BishopPiece
  | QueenPiece
  | KingPiece
  | PawnPiece;

type TPieceName = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King";

type TPieceColor = "black" | "white";

type TBoard = TSquare[][];

type TPiece = {
  color: TPieceColor;
  name: TPieceName;
} | null;
