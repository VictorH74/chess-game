import { ChessSound } from "@/classes/sound";
import { TPieceClass, TPieceColor, TSquare } from "@/types";
import {
  gePieceClassbyPosition,
  getOpponentCheckMoves,
  opponentPiecePossibleMoves,
} from "@/utils/functions";
import React from "react";
import { useGameCtx } from "./GameContext";

export type KingPosMap = Record<"white" | "black", `${number}-${number}`>;

export interface BoardCtxProps {
  board: TSquare[][];
  highlightedSquare: TSquare | null;
  setHighlightedSquare: (square: TSquare | null) => void;
  possibleMoves: `${number}-${number}`[];
  opponentCheckMoves: `${number}-${number}`[];
  setOpponentCheckMoves: (a: `${number}-${number}`[]) => void;
  kingPosition: KingPosMap;
  setKingPosition: (color: TPieceColor, value: `${number}-${number}`) => void;
  checkPiece: (square: TSquare) => void;
  setBoard: (newBoard: TSquare[][]) => void;
  chooseReplacementPiece: (piece: TPieceClass) => void;
  replacementPeace: TSquare | null;
}

const array = Array(8).fill(undefined);
const initialPositions = array.map((_, row) =>
  array.map((_, col) => ({
    position: { row, col },
    piece: gePieceClassbyPosition({ row, col }),
  }))
);

const defaultValue: BoardCtxProps = {
  board: initialPositions,
  highlightedSquare: null,
  replacementPeace: null,
  opponentCheckMoves: [],
  possibleMoves: [],
  kingPosition: {
    white: "0-4",
    black: "7-4",
  },
  chooseReplacementPiece: () => {},
  setOpponentCheckMoves: () => {},
  setHighlightedSquare: () => {},
  setKingPosition: () => {},
  checkPiece: () => {},
  setBoard: () => {},
};

const boardCtx = React.createContext(defaultValue);

export const useBoardCtx = () => React.useContext(boardCtx);

export default function BoardCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const gameCtx = useGameCtx();

  const [board, setBoardState] = React.useState<TSquare[][]>(initialPositions);
  const [highlightedSquare, setHighlightedSquareState] =
    React.useState<TSquare | null>(null);
  const [possibleMoves, setPossibleMoves] = React.useState<
    `${number}-${number}`[]
  >([]);
  const [replacementPeace, setReplacementPeace] =
    React.useState<TSquare | null>(null);
  const [opponentCheckMoves, setOpponentCheckMovesState] = React.useState<
    `${number}-${number}`[]
  >([]);
  const [kingPosition, setKingPositionState] = React.useState<KingPosMap>(
    defaultValue.kingPosition
  );

  React.useEffect(() => {
    ChessSound.preLoadAudios();
  }, []);

  // [replacementPeace]
  React.useEffect(() => {
    if (replacementPeace?.piece?.color) gameCtx.setShowModal(true);
  }, [replacementPeace]);

  // [highlightedSquare]
  React.useEffect(() => {
    if (!highlightedSquare?.piece) {
      setPossibleMoves([]);
      return;
    }

    let {
      piece: { name: highlightedPieceName, color: highlightedPieceColor },
      position: { row: highlightedRow, col: highlightedCol },
    } = highlightedSquare;

    let possibleMoves: `${number}-${number}`[] =
      highlightedSquare.piece.possibleMoves(
        board,
        highlightedRow,
        highlightedCol
      );

    const isKingPiece = highlightedPieceName === "King";

    if (isKingPiece) {
      // filtrar possiveis movimentos do rei inpedindo movimentos perigosos
      let dangerousMoves = opponentPiecePossibleMoves(
        board,
        highlightedPieceColor
      );
      possibleMoves = possibleMoves.filter((m) => !dangerousMoves.includes(m));
      if (opponentCheckMoves.length > 0) {
        possibleMoves = possibleMoves.filter(
          (m) => !opponentCheckMoves.slice(1).includes(m)
        );
      }
    } else if (opponentCheckMoves.length > 0) {
      // filtrar possiveis movimentos da peça incluindo apenas posições que estão em opponentCheckMoves
      possibleMoves = possibleMoves.filter((m) => {
        let positions: `${number}-${number}`[] = [];

        for (const position of opponentCheckMoves) {
          let [row, col] = position.split("-").map((p) => Number(p));
          if (board[row][col].piece?.name === "King") break;
          positions.push(position);
        }

        return positions.includes(m);
      });
    }

    setPossibleMoves(possibleMoves);
  }, [highlightedSquare]);

  const chooseReplacementPiece = (piece: TPieceClass) => {
    if (!replacementPeace?.piece || !piece) return;
    let { row, col } = replacementPeace.position;
    let pos = board;
    pos[row][col].piece = piece;
    setReplacementPeace(null);
    gameCtx.setShowModal(false);
  };

  const checkPiece = (square: TSquare) => {
    let { piece, position } = square;
    if (!piece) return;

    /* Verificar se peão chegou a borda do oponente */
    if (
      piece.name === "Pawn" &&
      square.position.row === (piece.color === "black" ? 0 : 7)
    ) {
      setReplacementPeace(square);
    }

    /* 
        Verificar se rei do oponente se encontra em alguma dos possiveis movimentos futuro da peça movida
        */
    let currentColor: TPieceColor = piece.color === "white" ? "black" : "white";
    let opponenteKingPosition: `${number}-${number}` =
      kingPosition[currentColor];

    let [row, col] = opponenteKingPosition.split("-").map((p) => Number(p));
    let opponentKing = board[row][col].piece;

    let tempOpponentCheckMoves: `${number}-${number}`[] = [];

    /* Verificar se peça movimentada deu check no rei oponente */
    if (
      piece
        .possibleMoves(board, position.row, position.col)
        .includes(opponenteKingPosition)
    ) {
      tempOpponentCheckMoves = getOpponentCheckMoves(
        { row, col },
        square,
        board
      );
      setOpponentCheckMoves(tempOpponentCheckMoves);
    }

    if (!opponentKing) return;

    /* Verificar se rei oponente não há possiveis movimento. caso sim, checkmate */
    let opponentAttackingPositions = opponentPiecePossibleMoves(
      board,
      currentColor
    );

    let opponentKingMoves = opponentKing
      .possibleMoves(board, row, col)
      .filter((m) => !opponentAttackingPositions.includes(m))
      .filter((m) => !tempOpponentCheckMoves.includes(m));

    // verificar se alguns dos possiveis movimento de peças do oponente podem salvar o rei
    const kingSafeCheck = () => {
      let positions: `${number}-${number}`[] = [];
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (
            piece &&
            board[row][col].piece !== null &&
            board[row][col].piece?.color !== piece.color
          ) {
            let piecePossibleMoves = board[row][col].piece?.possibleMoves(
              board,
              row,
              col
            ) as `${number}-${number}`[];

            if (board[row][col].piece?.name === "King") {
              let dangerousMoves = opponentPiecePossibleMoves(
                board,
                currentColor
              );
              piecePossibleMoves = piecePossibleMoves.filter(
                (m) => !dangerousMoves.includes(m)
              );
              if (opponentCheckMoves.length > 0) {
                piecePossibleMoves = piecePossibleMoves.filter(
                  (m) => !opponentCheckMoves.slice(1).includes(m)
                );
              }
            }

            positions = [...positions, ...piecePossibleMoves];
          }
        }
      }
      positions = positions.filter((p) => tempOpponentCheckMoves.includes(p));
      return positions.length > 0;
    };

    if (
      opponentKingMoves.length === 0 &&
      opponentAttackingPositions.includes(opponenteKingPosition) &&
      !kingSafeCheck()
    ) {
      gameCtx.defineWinner(piece.color);
      return;
    }
  };

  const setBoard = (newBoard: TSquare[][]) => setBoardState(newBoard);

  const setHighlightedSquare = (square: TSquare | null) =>
    setHighlightedSquareState(square);

  const setKingPosition = (color: TPieceColor, value: `${number}-${number}`) =>
    setKingPositionState((prev) => ({
      ...prev,
      [color]: value,
    }));

  const setOpponentCheckMoves = (a: `${number}-${number}`[]) =>
    setOpponentCheckMovesState(a);

  return (
    <boardCtx.Provider
      value={{
        board,
        highlightedSquare,
        setHighlightedSquare,
        possibleMoves,
        opponentCheckMoves,
        setOpponentCheckMoves,
        kingPosition,
        setKingPosition,
        checkPiece,
        setBoard,
        chooseReplacementPiece,
        replacementPeace,
      }}
    >
      {children}
    </boardCtx.Provider>
  );
}
