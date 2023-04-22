import { RookPiece } from "@/classes/rook";
import { KnightPiece } from "@/classes/knight";
import { PawnPiece } from "@/classes/pawn";
import { BishopPiece } from "@/classes/bishop";
import { KingPiece } from "@/classes/king";
import { QueenPiece } from "@/classes/queen";

export const getPiecebyPosition = (position: TPosition): TPiece => {
  let { row, col } = position;
  let color: TPieceColor | undefined =
    row === 0 || row === 1
      ? "white"
      : row === 7 || row === 6
      ? "black"
      : undefined;

  if (!color) return null;

  if ((col === 0 || col === 7) && (row === 0 || row === 7))
    return { color, name: "Rook" };
  if ((col === 1 || col === 6) && (row === 0 || row === 7))
    return { color, name: "Knight" };
  if ((col === 2 || col === 5) && (row === 0 || row === 7))
    return { color, name: "Bishop" };
  if (col === 3 && (row === 0 || row === 7)) return { color, name: "Queen" };
  if (col === 4 && (row === 0 || row === 7)) return { color, name: "King" };

  return { color, name: "Pawn" };
};

export const getPossibleMoves = (
  pieceName: TPieceName,
  board: TBoard,
  selectedRow: number,
  selectedCol: number,
  color: TPieceColor
): string[] => {
  if (pieceName === "Pawn") {
    return PawnPiece.possibleMoves(board, selectedRow, selectedCol, color);
  } else if (pieceName === "Rook") {
    return RookPiece.possibleMoves(board, selectedRow, selectedCol, color);
  } else if (pieceName === "Knight") {
    return KnightPiece.possibleMoves(board, selectedRow, selectedCol, color);
  } else if (pieceName === "Bishop") {
    return BishopPiece.possibleMoves(board, selectedRow, selectedCol, color);
  } else if (pieceName === "Queen") {
    return QueenPiece.possibleMoves(board, selectedRow, selectedCol, color);
  } else if (pieceName === "King") {
    return KingPiece.possibleMoves(board, selectedRow, selectedCol, color);
  } else {
    return [];
  }
};

export const getDangerPositions = (
  kingPosition: TPosition,
  square: TSquare,
  board: TBoard
) => {
  let { row, col } = square.position;
  let places: string[] = [];

  // places.push(`${row}-${col}`);

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

  // let limit: boolean = false;
  // while (!limit) {
  //   if (kingPosition.row > square.position.row) {
  //     row -= 1;
  //   } else if (kingPosition.row < square.position.row) {
  //     row += 1;
  //   }

  //   if (kingPosition.col > square.position.col) {
  //     col -= 1;
  //   } else if (kingPosition.col < square.position.col) {
  //     col += 1;
  //   }
  //   places.push(`${row}-${col}`);

  //   let currentSquare = board[row][col];

  //   let { row: currentSquareRow, col: currentSquareCol } =
  //     currentSquare.position;

  //   limit =
  //     !!currentSquare.piece &&
  //     currentSquareRow === row &&
  //     currentSquareCol === col;
  // }

  return places;
};
