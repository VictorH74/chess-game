import { RookPiece } from "@/classes/rook";
import { KnightPiece } from "@/classes/knight";
import { PawnPiece } from "@/classes/pawn";
import { BishopPiece } from "@/classes/bishop";
import { KingPiece } from "@/classes/king";
import { QueenPiece } from "@/classes/queen";
import {
  TBoard,
  TPieceClass,
  TPieceColor,
  TPieceName,
  TPosition,
  TSquare,
} from "@/types";

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
  if (square.piece && ["Knight", "Pawn", "King"].includes(square.piece?.name)) {
    places.push(`${kingPosition.row}-${kingPosition.col}`);
    return places;
  }

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

export const opponentPieceAttackingPositions = (
  board: TBoard,
  selectedPieceColor: TPieceColor
) => {
  let opponentPiecesPositions: string[] = [];

  // Verificar cada peça do oponente se a peça selecionada for o rei para identificar posições de risco dos possiveis movimentos da peça rei
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let { position, piece } = board[row][col];
      if (piece && piece.color !== selectedPieceColor) {
        if (
          piece.name === "Pawn" &&
          (piece.color === "black"
            ? position.row - 1 >= 0
            : position.row + 1 <= 7)
        ) {
          let row =
            piece.color === "black" ? position.row - 1 : position.row + 1;
          if (position.col + 1 <= 7) {
            opponentPiecesPositions.push(`${row}-${position.col + 1}`);
          }
          if (position.col - 1 >= 0) {
            opponentPiecesPositions.push(`${row}-${position.col - 1}`);
          }
          continue;
        }

        // Verificar se peça é uma das escolhidas abaixo para acrescentar um argumento adicional que inclui a ultima peça que tem a mesma cor que ela. obj: incluir a ultima peça nas lista para ser considerada na filtragem de possiveis movimentos da peça rei (opponentPiecesPositions)

        // Usada em: useEffect(..., [selectedSquare]), ultima condição de checkPiece() em GameBoard.tsx **
        if (["Rook", "Bishop", "Knight", "Queen"].includes(piece.name)) {
          opponentPiecesPositions.push(
            ...piece.possibleMoves(board, position.row, position.col, true)
          );
        } else {
          opponentPiecesPositions.push(
            ...piece.possibleMoves(board, position.row, position.col)
          );
        }
      }
    }
  }

  return opponentPiecesPositions;
};

export const getOpponentKingPosition = (
  board: TBoard,
  currentPlayerColor: TPieceColor
) => {
  let kingPosition;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let { piece: tempPiece, position: tempPosition } = board[row][col];
      if (
        tempPiece &&
        currentPlayerColor !== tempPiece.color &&
        tempPiece.name === "King"
      ) {
        kingPosition = tempPosition;
        break;
      }
    }
    if (kingPosition) break;
  }
  return kingPosition;
};
