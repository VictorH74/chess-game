import { BasePiece } from "./classes/base";

type TPieceName = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King"

type TPieceColor = "black" | "white"

type TBoard = TSquare[][]

type TPiece = {
  color: TPieceColor;
  name: TPieceName;
} | null;






