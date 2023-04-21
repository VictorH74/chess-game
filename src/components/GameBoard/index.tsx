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
  const [piecesToResurrect, setPiecesToResurrect] = useState<TPiece[]>([]);
  const [winner, setWinner] = useState<"white" | "black" | undefined>();

  useEffect(() => {
    if (replacementPeace?.piece?.color) {
      // list dead pieces
      let { color } = replacementPeace.piece;
      setPiecesToResurrect(
        ["Rook", "Knight", "Bishop", "Queen"].map((name) => ({
          color,
          name,
        }))
      );

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

    let places: string[] = [];

    //===========================================================
    // PIECE LOGICS =============================================
    //===========================================================

    if (name === "Pawn") {
      places = PawnPiece.possibleMoves(board, selectedRow, selectedCol, color);
    } else if (name === "Rook") {
      // col+
      places = RookPiece.possibleMoves(board, selectedRow, selectedCol, color);
    } else if (name === "Knight") {
      places = KnightPiece.possibleMoves(
        board,
        selectedRow,
        selectedCol,
        color
      );
    } else if (name === "Bishop") {
      places = BishopPiece.possibleMoves(
        board,
        selectedRow,
        selectedCol,
        color
      );
    } else if (name === "Queen") {
      places = QueenPiece.possibleMoves(board, selectedRow, selectedCol, color);
    } else if (name === "King") {
      places = KingPiece.possibleMoves(board, selectedRow, selectedCol, color);
    }

    setPossibleMoves(places);
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
    (squadObj: TSquare) => {
      // Check if has some piece on selected square and if the selected piece color is equal to the current player color
      if (!squadObj.piece || !(props.currentPlayer === squadObj.piece?.color))
        return;
      setSelectedSquare(squadObj);
    },
    [selectedSquare]
  );

  const movePiece = useCallback(
    (squadObj: TSquare) => {
      let { row, col } = squadObj.position;

      // Check if the current player has selected your piece and click on another piece with the same color
      if (props.currentPlayer === squadObj.piece?.color) {
        select(squadObj);
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
      let pos = board;

      if (
        pos[row][col]?.piece?.color !== selectedSquare?.piece?.color &&
        pos[row][col]?.piece?.color !== null
      ) {
        props.incrementDeadPieces(pos[row][col].piece);
      }

      if (pos[row][col].piece?.name === "King") {
        setWinner(selectedSquare.piece?.color as "white" | "black");
        setShowModal(true);
      }

      pos[row][col].piece = selectedSquare.piece;
      pos[selectedRow][selectedCol].piece = null;

      checkPiece(pos[row][col]);
      setBoard(pos);
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
      <div
        className={`
      h-full
      aspect-square shadow-xl overflow-hidden rounded-md
      `}
      >
        {board.map((row: TSquare[], rowIndex) => (
          <div key={rowIndex} className="flex flex-row">
            {row.map((squareObj: TSquare, colIndex) => (
              <BoardSquare
                key={colIndex}
                odd={(rowIndex + colIndex) % 2 !== 0}
                square={squareObj}
                onClick={selectedSquare ? movePiece : select}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
              />
            ))}
          </div>
        ))}
      </div>
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
        gap-2
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
              className="uppercase bg-blue-400 m-2 py-2 px-5 rounded-md"
            >
              restart
            </button>
          </div>
        ) : (
          piecesToResurrect.map(
            (piece, i) =>
              piece?.name !== "Pawn" && (
                <div
                  key={i}
                  className="h-[15%]"
                  onClick={() => chooseReplacementPiece(piece)}
                >
                  <PeaceIcon
                    name={piece?.name || "Pawn"}
                    color={piece?.color || "black"}
                  />
                </div>
              )
          )
        )}
      </div>
    </>
  );
}
