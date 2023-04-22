import { RookPiece } from "@/classes/rook";
import { KnightPiece } from "@/classes/knight";
import { PawnPiece } from "@/classes/pawn";
import { BishopPiece } from "@/classes/bishop";
import { KingPiece } from "@/classes/king";
import { QueenPiece } from "@/classes/queen";
import { BasePiece, TPieceClass } from "@/classes/base";
import { TBoard, TPieceColor, TPieceName } from "@/types";
import { TPosition, TSquare } from "@/components/BoardSquare";

export const gePieceClassbyPosition = (
  position: TPosition
): TPieceClass | null => {
  let { row, col } = position;
  let color: TPieceColor | undefined =
    row === 0 || row === 1
      ? "white"
      : row === 7 || row === 6
      ? "black"
      : undefined;

  if (!color) return null;

  if ((col === 0 || col === 7) && (row === 0 || row === 7))
    return new RookPiece("Rook", color);
  if ((col === 1 || col === 6) && (row === 0 || row === 7))
    return new KnightPiece("Knight", color);
  if ((col === 2 || col === 5) && (row === 0 || row === 7))
    return new BishopPiece("Bishop", color);
  if (col === 3 && (row === 0 || row === 7))
    return new QueenPiece("Queen", color);
  if (col === 4 && (row === 0 || row === 7))
    return new KingPiece("King", color);

  return new PawnPiece("Pawn", color);
};

export const createPiece = (
  name: TPieceName,
  color: TPieceColor
): TPieceClass => {
  if (name === "Rook") return new RookPiece("Rook", color);
  if (name === "Knight") return new KnightPiece("Rook", color);
  if (name === "Bishop") return new BishopPiece("Rook", color);
  if (name === "Queen") return new QueenPiece("Rook", color);
  if (name === "King") return new KingPiece("Rook", color);
  return new PawnPiece("Pawn", color);
};

export const getDangerPositions = (
  kingPosition: TPosition,
  square: TSquare,
  board: TBoard
) => {
  let { row, col } = square.position;
  let places: string[] = [];

  // temp
  if (square.piece?.name === "Knight") return places;

  // if (square.piece?.name === "Pawn") return places;

  // if (square.piece?.name === "King") return places;

  // Queen - Bishop - Rook
  let limit: boolean = false;
  while (!limit) {
    places.push(`${row}-${col}`);

    if (square.position.row > kingPosition.row) {
      row -= 1;
    } else if (square.position.row < kingPosition.row) {
      row += 1;
    }

    if (square.position.col > kingPosition.col) {
      col -= 1;
    } else if (square.position.col < kingPosition.col) {
      col += 1;
    }

    if (row < 0 || row > 7 || col < 0 || col > 7) {
      limit = true;
    } else {
      let currentSquare = board[row][col];

      limit = !!currentSquare.piece && currentSquare.piece.name !== "King";
    }
  }

  return places;
};
