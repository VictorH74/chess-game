import { useEffect, useState, useCallback } from "react";
import PeaceIcon from "../PieceIcon";
import {
  createPiece,
  getDangerPositions,
  gePieceClassbyPosition,
  opponentPieceAttackingPositions,
  getBlockingPositions,
} from "@/utils/functions";
import Board from "../Board";
import { pieceNames } from "@/utils/constants";
import { TPieceClass, TSquare } from "@/types";
import { TPieceColor } from "@/types";
import { ChessSound } from "@/classes/sound";

const array = Array(8).fill(undefined);
const initialPositions = array.map((_, row) =>
  array.map((_, col) => ({
    position: { row, col },
    piece: gePieceClassbyPosition({ row, col }),
  }))
);

interface Props {
  currentPlayer: TPieceColor;
  changeCurrentPlayer: () => void;
  incrementDeadPieces: (piece: TPieceClass) => void;
  reset: () => void;
}

export default function GameBoard(props: Props) {
  const [selectedSquare, setSelectedSquare] = useState<TSquare | null>(null);
  const [board, setBoard] = useState<TSquare[][]>(initialPositions);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [replacementPeace, setReplacementPeace] = useState<TSquare | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState<TPieceColor | undefined>();
  const [dangerPositions, setDangerPositions] = useState<string[]>([]);
  const [kingPosition, setKingPosition] = useState({
    white: "0-4",
    black: "7-4",
  });

  useEffect(() => {
    ChessSound.preLoadAudios();
  }, []);

  useEffect(() => {
    if (replacementPeace?.piece?.color) {
      // show modal
      setShowModal(true);
    }
  }, [replacementPeace]);

  // Efeito para o state "selectedSquare"
  // para determinar possiveis movimentos da peça selecionada
  useEffect(() => {
    if (!selectedSquare?.piece) {
      setPossibleMoves([]);
      return;
    }

    let { row: selectedRow, col: selectedCol } = selectedSquare.position;
    let { name: selectedPieceName, color: selectedPieceColor } =
      selectedSquare.piece;

    // Retornar possiveis movimentos da peça selecionada
    let moves: string[] = selectedSquare.piece.possibleMoves(
      board,
      selectedRow,
      selectedCol
    );

    if (dangerPositions.length > 0 && selectedPieceName !== "King") {
      // Uma lista de posições com apenas as posições de risco que estão entre o rei e a peça oponente que causou as posições de dangerPositions
      moves = moves.filter((m) =>
        getBlockingPositions(dangerPositions, board).includes(m)
      );
    } else if (selectedPieceName === "King") {
      // console.log("moves", moves);
      if (dangerPositions.length > 0) {
        /*
        Uma lista de posições de dangerPositions excluindo a posição da peça do oponente que causou as posições de dangerPositions 
        */
        let dangerPositionsWithoutFirstPosition = dangerPositions.filter(
          (_, i) => i !== 0
        );
        moves = moves.filter(
          (m) => !dangerPositionsWithoutFirstPosition.includes(m)
        );
        // console.log(
        //   "moves excluding danger positions without the first",
        //   moves
        // );
      }

      /* 
      Verificar cada peça do oponente se a peça selecionada for o rei para identificar posições de risco dos possiveis movimentos da peça rei 
      */
      let opponentPiecesPositions: string[] = opponentPieceAttackingPositions(
        board,
        selectedPieceColor
      );
      moves = moves.filter((m) => !opponentPiecesPositions.includes(m));
      // console.log("moves excluding opponent pieces positions", moves);
    }

    setPossibleMoves(moves);
  }, [selectedSquare]);

  const chooseReplacementPiece = (piece: TPieceClass) => {
    if (!replacementPeace?.piece || !piece) return;
    let { row, col } = replacementPeace.position;
    let pos = board;
    pos[row][col].piece = piece;
    setReplacementPeace(null);
    setShowModal(false);
  };

  const select = useCallback(
    (square: TSquare) => {
      /* 
      Verificar se há peça no quadradro selecionado e se a cor da peça selecionada é igual ao jogador atual 
      */
      if (!square.piece || !(props.currentPlayer === square.piece?.color))
        return;

      ChessSound.playClickAudio();

      setSelectedSquare(square);
    },
    [selectedSquare]
  );

  const movePiece = useCallback(
    (chosenSquare: TSquare) => {
      if (!selectedSquare?.piece) return;

      const { row: chosenRow, col: chosenCol } = chosenSquare.position;
      const { row: selectedRow, col: selectedCol } = selectedSquare.position;
      const selectedPiece = selectedSquare.piece;

      /* Verificar se a peça da posição escolhida é a que jogador selecionou anteriormente */
      /* true -> desmarca peça clicada */
      if (selectedRow === chosenRow && selectedCol === chosenCol) {
        setSelectedSquare(null);
        ChessSound.playMoveAudio();
        return;
      }

      /* Verificar se o jogador atual selecionou sua peça e clicou em outra peça sua */
      /* true -> selecionar peça clicada */
      if (props.currentPlayer === chosenSquare.piece?.color) {
        select(chosenSquare);
        return;
      }

      /* Verificar se posição escolhida para se mover está na lista de possivies movimentos da peça selecionada */
      if (!possibleMoves.includes(`${chosenRow}-${chosenCol}`)) return;

      if (board[chosenRow][chosenCol].piece === null)
        ChessSound.playconditionalMoveAudio(selectedPiece.name);

      /* Verificar se peça selecionada é um Rei e posição de destino está livre de perigo */
      if (
        selectedPiece?.name === "King" &&
        dangerPositions.includes(`${chosenRow}-${chosenCol}`) &&
        board[chosenRow][chosenCol].piece === null
      ) {
        return;
      }

      let newBoard = board;
      let chosenSquarePiece = newBoard[chosenRow][chosenCol].piece;

      /* Verificar se há peça na posição escolhida e se a peça é do oponente */
      /* true -> ascrescentar peça na lista de peças eliminadas de sua cor */
      if (
        chosenSquarePiece &&
        chosenSquarePiece.color !== selectedPiece?.color &&
        chosenSquarePiece.color !== null
      ) {
        ChessSound.playAttackAudio();
        props.incrementDeadPieces(chosenSquarePiece);
      }

      if (chosenSquarePiece?.name === "King") {
        defineWinner(selectedPiece?.color as TPieceColor);
      }

      newBoard[chosenRow][chosenCol].piece = selectedPiece;
      newBoard[selectedRow][selectedCol].piece = null;

      /* atualizar posição do rei */
      if (selectedPiece?.name === "King") {
        setKingPosition((prev) => ({
          ...prev,
          [selectedPiece.color]: `${chosenRow}-${chosenCol}`,
        }));
      }

      checkPiece(newBoard[chosenRow][chosenCol]);
      setBoard(newBoard);
      setSelectedSquare(null);
      if (dangerPositions.length > 0) setDangerPositions([]);
      props.changeCurrentPlayer();
    },
    [selectedSquare, possibleMoves]
  );

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
    let kingPosition = getOpponentKingPosition(board, piece.color); 
    */
    let currentColor: TPieceColor = piece.color === "white" ? "black" : "white";
    let opponenteKingPosition =
      kingPosition[currentColor as keyof typeof kingPosition];

    let [row, col] = opponenteKingPosition.split("-");
    let opponentKingPiece = board[Number(row)][Number(col)].piece;

    let tempDangerPositions: string[] = [];

    /* Verificar se peça movimentada deu check no rei oponente */
    if (
      piece
        .possibleMoves(board, position.row, position.col)
        .includes(opponenteKingPosition)
    ) {
      tempDangerPositions = getDangerPositions(
        { row: Number(row), col: Number(col) },
        square,
        board
      );
      setDangerPositions(tempDangerPositions);
    }

    if (!opponentKingPiece) return;

    /* Verificar se rei oponente não há possiveis movimento. caso resolvido, checkmate */
    let opponentKingPieceMoves = opponentKingPiece.possibleMoves(
      board,
      Number(row),
      Number(col)
    );
    let opponentAttackingPositions = opponentPieceAttackingPositions(
      board,
      currentColor
    );

    opponentKingPieceMoves = opponentKingPieceMoves.filter(
      (m) => !opponentAttackingPositions.includes(m)
    );
    opponentKingPieceMoves = opponentKingPieceMoves.filter(
      (m) => !tempDangerPositions.includes(m)
    );

    if (
      opponentKingPieceMoves.length === 0 &&
      opponentAttackingPositions.includes(opponenteKingPosition)
    ) {
      defineWinner(piece.color);
      return;
    }
  };

  const defineWinner = (color: TPieceColor) => {
    setWinner(color);
    setShowModal(true);
  };

  const reset = () => {
    alert("Em desenvolvimento. Use a tecla F5 para recarregar a página 👍");
  };

  return (
    <>
      <Board
        board={board}
        squareHandleClick={selectedSquare ? movePiece : select}
        selectedSquare={selectedSquare}
        possibleMoves={possibleMoves}
        dangerPositions={dangerPositions}
      />

      <div
        className={`absolute bg-[#00000030] inset-0 duration-200 flex flex-wrap items-center justify-center p-2 gap-6 ${
          showModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {winner ? (
          <div className="text-center uppercase">
            <h1 className=" @[350px]:text-2xl font-semibold">
              {winner} player won!!
            </h1>
            <button
              onClick={reset}
              className="uppercase bg-blue-400 m-2 py-2 px-5 rounded-md hover:scale-110 duration-150"
            >
              restart
            </button>
          </div>
        ) : replacementPeace ? (
          pieceNames.map(
            (name) =>
              name !== "Pawn" && (
                <div
                  key={name}
                  className="w-[13%] hover:scale-125 duration-200"
                  onClick={() =>
                    chooseReplacementPiece(
                      createPiece(
                        name,
                        replacementPeace.piece?.color || "black"
                      )
                    )
                  }
                >
                  <PeaceIcon
                    name={name || "Pawn"}
                    color={replacementPeace.piece?.color || "black"}
                  />
                </div>
              )
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}
