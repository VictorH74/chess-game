import { useEffect, useState, useCallback } from "react";
import BoardSquare from "../BoardSquare";
import { RookPiece } from "@/classes/rook";
import { KnightPiece } from "@/classes/knight";
import { PawnPiece } from "@/classes/pawn";
import { BishopPiece } from "@/classes/bishop";
import { KingPiece } from "@/classes/king";
import { QueenPiece } from "@/classes/queen";
import PeaceIcon from "../PieceIcon";
import { getPiecebyPosition } from "@/utils/functions";
import Board from "../Board";

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
    if (name === "Pawn") {
      setPossibleMoves(
        PawnPiece.possibleMoves(board, selectedRow, selectedCol, color)
      );
    } else if (name === "Rook") {
      setPossibleMoves(
        RookPiece.possibleMoves(board, selectedRow, selectedCol, color)
      );
    } else if (name === "Knight") {
      setPossibleMoves(
        KnightPiece.possibleMoves(board, selectedRow, selectedCol, color)
      );
    } else if (name === "Bishop") {
      setPossibleMoves(
        BishopPiece.possibleMoves(board, selectedRow, selectedCol, color)
      );
    } else if (name === "Queen") {
      setPossibleMoves(
        QueenPiece.possibleMoves(board, selectedRow, selectedCol, color)
      );
    } else if (name === "King") {
      setPossibleMoves(
        KingPiece.possibleMoves(board, selectedRow, selectedCol, color)
      );
    }
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
      props.changeCurrentPlayer();
    },
    [selectedSquare, possibleMoves]
  );

  // Check if white or black pawn has reached the end
  const checkPiece = (square: TSquare) => {
    let piece = square.piece;
    if (
      piece &&
      ((piece.color === "black" &&
        piece.name === "Pawn" &&
        square.position.row === 0) ||
        (piece.color === "white" &&
          piece.name === "Pawn" &&
          square.position.row === 7))
    ) {
      setReplacementPeace(square);
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
          ["Rook", "Knight", "Bishop", "Queen"].map(
            (name, i) =>
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
