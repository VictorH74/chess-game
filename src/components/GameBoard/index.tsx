import { useEffect, useState, useCallback } from "react";
import PeaceIcon from "../PieceIcon";
import {
  getDangerPositions,
  getPiecebyPosition,
  getPossibleMoves,
} from "@/utils/functions";
import Board from "../Board";
import { pieceNames } from "@/utils/constants";

const array = Array(8).fill(undefined);
const initialPositions = array.map((_, row) =>
  array.map((_, col) => ({
    position: { row, col },
    piece: getPiecebyPosition({ row, col }),
  }))
);

interface Props {
  currentPlayer: "white" | "black";
  changeCurrentPlayer: () => void;
  incrementDeadPieces: (piece: TPiece) => void;
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
  const [winner, setWinner] = useState<"white" | "black" | undefined>();
  const [dangerPositions, setDangerPositions] = useState<string[]>([]);

  useEffect(() => {
    if (replacementPeace?.piece?.color) {
      // show modal
      setShowModal(true);
    }
  }, [replacementPeace]);

  useEffect(() => {
    if (!selectedSquare?.piece) {
      setPossibleMoves([]);
      return;
    }

    let { row: selectedRow, col: selectedCol } = selectedSquare.position;
    let { name, color } = selectedSquare.piece;

    // PIECE LOGICS =============================================
    let moves = getPossibleMoves(name, board, selectedRow, selectedCol, color);

    if (dangerPositions.length > 0 && selectedSquare.piece.name !== "King") {
      let dangerPositionsAfterKingPosition: string[] = [];

      for (const position of dangerPositions) {
        let [row, col] = position.split("-");
        if (board[Number(row)][Number(col)].piece?.name === "King") break;
        dangerPositionsAfterKingPosition.push(position);
      }

      moves = moves.filter((m) => dangerPositionsAfterKingPosition.includes(m));
    }

    setPossibleMoves(moves);
  }, [selectedSquare]);

  const chooseReplacementPiece = (piece: TPiece) => {
    if (!replacementPeace?.piece || !piece) return;
    let { row, col } = replacementPeace.position;
    let pos = board;
    pos[row][col].piece = piece;
    setReplacementPeace(null);
    setShowModal(false);
  };

  const select = useCallback(
    (square: TSquare) => {
      // Check if has some piece on selected square and if the selected piece color is equal to the current player color
      if (!square.piece || !(props.currentPlayer === square.piece?.color))
        return;
      setSelectedSquare(square);
    },
    [selectedSquare]
  );

  const movePiece = useCallback(
    (square: TSquare) => {
      let { row, col } = square.position;

      // Check if the current player has selected your piece and click on another piece with the same color
      if (props.currentPlayer === square.piece?.color) {
        select(square);
        return;
      }

      if (!selectedSquare || !possibleMoves.includes(`${row}-${col}`)) return;

      if (
        selectedSquare?.piece?.name === "King" &&
        dangerPositions.includes(`${row}-${col}`) &&
        board[row][col].piece === null
      )
        return; //

      if (
        row === selectedSquare.position.row &&
        col === selectedSquare.position.col
      ) {
        setSelectedSquare(null);
        return;
      }

      let { row: selectedRow, col: selectedCol } = selectedSquare.position;
      let newBoard = board;

      if (
        newBoard[row][col]?.piece?.color !== selectedSquare?.piece?.color &&
        newBoard[row][col]?.piece?.color !== null
      ) {
        props.incrementDeadPieces(newBoard[row][col].piece);
      }

      if (newBoard[row][col].piece?.name === "King") {
        setWinner(selectedSquare.piece?.color as "white" | "black");
        setShowModal(true);
      }

      newBoard[row][col].piece = selectedSquare.piece;
      newBoard[selectedRow][selectedCol].piece = null;

      checkPiece(newBoard[row][col]);
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

    // Check if white or black pawn has reached the end
    if (
      (piece.color === "black" &&
        piece.name === "Pawn" &&
        square.position.row === 0) ||
      (piece.color === "white" &&
        piece.name === "Pawn" &&
        square.position.row === 7)
    ) {
      setReplacementPeace(square);
    }

    // Checar se rei do oponente se encontra em alguma dos possiveis movimentos futuro da peça movida
    let kingPosition;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let { piece: tempPiece, position: tempPosition } = board[row][col];
        if (
          tempPiece &&
          piece.color !== tempPiece.color &&
          tempPiece.name === "King"
        ) {
          kingPosition = tempPosition;
          break;
        }
      }
      if (kingPosition) break;
    }

    if (!kingPosition) return;

    if (
      getPossibleMoves(
        piece.name,
        board,
        position.row,
        position.col,
        piece.color
      ).includes(`${kingPosition.row}-${kingPosition.col}`)
    ) {
      // check
      setDangerPositions(getDangerPositions(kingPosition, square, board));
      setTimeout(() => alert("CHECK!"), 500);
    }
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
        className={`
        absolute 
        bg-[#00000030] 
        top-0 
        bottom-0 
        left-0 
        right-0
        duration-200
        flex
        flex-wrap
        items-center
        justify-center
        p-2
        gap-6
        ${
          showModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        `}
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
                    chooseReplacementPiece({
                      name,
                      color: replacementPeace.piece?.color || "black",
                    })
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
