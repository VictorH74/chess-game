import { ChessSound } from "@/classes/sound";
import { KingPosMap, useBoardCtx } from "@/contexts/BoardContext";
import { useGameCtx } from "@/contexts/GameContext";
import { TPieceColor, TSquare } from "@/types";
import React from "react";

const useBoardSquare = () => {
  const gameCtx = useGameCtx();
  const boardCtx = useBoardCtx();

  const selectPiece = React.useCallback(
    (square: TSquare) => {
      if (!square.piece || !(gameCtx.currentPlayer === square.piece?.color))
        return;

      ChessSound.playClickAudio();

      boardCtx.setHighlightedSquare(square);
    },
    [boardCtx.highlightedSquare]
  );

  const movePiece = React.useCallback(
    (chosenSquare: TSquare) => {
      if (!boardCtx.highlightedSquare?.piece) return;

      const { row: chosenRow, col: chosenCol } = chosenSquare.position;
      const { row: highlightedRow, col: highlightedCol } =
        boardCtx.highlightedSquare.position;
      const highlightedPiece = boardCtx.highlightedSquare.piece;

      /* Verificar se a peça da posição escolhida é a que jogador selecionou anteriormente */
      /* true -> desmarca peça clicada */
      if (highlightedRow === chosenRow && highlightedCol === chosenCol) {
        boardCtx.setHighlightedSquare(null);
        ChessSound.playMoveAudio();
        return;
      }

      /* Verificar se o jogador atual selecionou sua peça e clicou em outra peça sua */
      /* true -> selecionar peça clicada */
      if (gameCtx.currentPlayer === chosenSquare.piece?.color) {
        selectPiece(chosenSquare);
        return;
      }

      /* Verificar se posição escolhida para se mover está na lista de possivies movimentos da peça selecionada */
      if (!boardCtx.possibleMoves.includes(`${chosenRow}-${chosenCol}`)) return;

      if (boardCtx.board[chosenRow][chosenCol].piece === null)
        ChessSound.playconditionalMoveAudio(highlightedPiece.name);

      /* Verificar se peça selecionada é um Rei e posição de destino está livre de perigo */
      if (
        highlightedPiece?.name === "King" &&
        boardCtx.opponentCheckMoves.includes(`${chosenRow}-${chosenCol}`) &&
        boardCtx.board[chosenRow][chosenCol].piece === null
      ) {
        return;
      }

      let newBoard = boardCtx.board;
      let chosenSquarePiece = newBoard[chosenRow][chosenCol].piece;

      /* Verificar se há peça na posição escolhida e se a peça é do oponente */
      /* true -> ascrescentar peça na lista de peças eliminadas de sua cor */
      if (
        chosenSquarePiece &&
        chosenSquarePiece.color !== highlightedPiece?.color &&
        chosenSquarePiece.color !== null
      ) {
        ChessSound.playAttackAudio();
        gameCtx.incrementDeadPieces(chosenSquarePiece);
      }

      if (chosenSquarePiece?.name === "King") {
        gameCtx.defineWinner(highlightedPiece?.color as TPieceColor);
      }

      newBoard[chosenRow][chosenCol].piece = highlightedPiece;
      newBoard[highlightedRow][highlightedCol].piece = null;

      /* atualizar posição do rei */
      if (highlightedPiece?.name === "King") {
        boardCtx.setKingPosition(
          highlightedPiece.color,
          `${chosenRow}-${chosenCol}`
        );
      }

      boardCtx.checkPiece(newBoard[chosenRow][chosenCol]);
      boardCtx.setBoard(newBoard);
      boardCtx.setHighlightedSquare(null);
      if (boardCtx.opponentCheckMoves.length > 0)
        boardCtx.setOpponentCheckMoves([]);
      gameCtx.changeCurrentPlayer();
    },
    [boardCtx.highlightedSquare, boardCtx.possibleMoves]
  );

  return { selectPiece, movePiece };
};

export default useBoardSquare;
