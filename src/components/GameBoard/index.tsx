import { useEffect, useState } from "react";
import BoardSquare from "./components/BoardSquare";
import { RookPiece } from "@/classes/rook";
import { KnightPiece } from "@/classes/knight";
import { PawnPiece } from "@/classes/pawn";
import { BishopPiece } from "@/classes/bishop";
import { KingPiece } from "@/classes/king";
import { QueenPiece } from "@/classes/queen";

const getPiece = (position: TPosition): TPiece => {
  let { x, y } = position;
  let color =
    x === 0 || x === 1 ? "white" : x === 7 || x === 6 ? "black" : undefined;

  if (!color) return null;

  if ((y === 0 || y === 7) && (x === 0 || x === 7))
    return { color, name: "Rook" };
  if ((y === 1 || y === 6) && (x === 0 || x === 7))
    return { color, name: "Knight" };
  if ((y === 2 || y === 5) && (x === 0 || x === 7))
    return { color, name: "Bishop" };
  if (y === 3 && (x === 0 || x === 7)) return { color, name: "Queen" };
  if (y === 4 && (x === 0 || x === 7)) return { color, name: "King" };

  return { color, name: "Pawn" };
};

const array = Array(8).fill(undefined);
const initialPosition = array.map((_, x) =>
  array.map((_, y) => ({
    position: { x, y },
    piece: getPiece({ x, y }),
  }))
);

interface Props {
  screen: "full" | "minimized";
}

export default function GameBoard(props: Props) {
  const [selectedSquare, setSelectedSquare] = useState<TSquare | null>(null);
  const [board, setBoard] = useState<TSquare[][]>(initialPosition);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">(
    "white"
  );

  // useEffect(() => {
  //   console.log(possibleMoves);
  // }, [possibleMoves]);

  useEffect(() => {
    if (!selectedSquare?.piece) {
      setPossibleMoves([]);
      return;
    }

    let { x: selectedX, y: selectedY } = selectedSquare.position;
    let { name, color } = selectedSquare.piece;

    let places: string[] = [];

    //===========================================================
    // PIECE LOGICS =============================================
    //===========================================================

    if (name === "Pawn") {
      places = PawnPiece.possibleMoves(board, selectedX, selectedY, color);
    } else if (name === "Rook") {
      // y+
      places = RookPiece.possibleMoves(board, selectedX, selectedY, color);
    } else if (name === "Knight") {
      places = KnightPiece.possibleMoves(board, selectedX, selectedY, color);
    } else if (name === "Bishop") {
      places = BishopPiece.possibleMoves(board, selectedX, selectedY, color);
    } else if (name === "Queen") {
      places = QueenPiece.possibleMoves(board, selectedX, selectedY, color);
    } else if (name === "King") {
      places = KingPiece.possibleMoves(board, selectedX, selectedY, color);
    }

    setPossibleMoves(places);
  }, [selectedSquare]);

  const select = (squadObj: TSquare) => {
    // Check if has some piece on selected square and if the selected piece color is equal to the current player color
    if (!squadObj.piece || !(currentPlayer === squadObj.piece?.color)) return;
    setSelectedSquare(squadObj);
  };

  const movePiece = (squadObj: TSquare) => {
    let { x, y } = squadObj.position;

    // Check if the current player has selected your piece and click on another piece with the same color
    if (currentPlayer === squadObj.piece?.color) {
      select(squadObj);
      return;
    }

    if (!selectedSquare || !possibleMoves.includes(`${x}-${y}`)) return;
    if (x === selectedSquare.position.x && y === selectedSquare.position.y) {
      setSelectedSquare(null);
      return;
    }

    let { x: selectedX, y: selectedY } = selectedSquare.position;
    let pos = board;

    pos[x][y].piece = selectedSquare.piece;
    pos[selectedX][selectedY].piece = null;

    setBoard(pos);
    setSelectedSquare(null);
    setCurrentPlayer((prev) => (prev === "white" ? "black" : "white"));
  };

  return (
    <div
      className={`
      h-full
      aspect-square shadow-xl overflow-hidden rounded-md`}
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
  );
}

/*
<div
      className={`
      ${
        props.screen === "full"
          ? "@[1050px]:h-full "
          : "@[780px]:h-full @[780px]:max-h-[70%]"
      } 
      w-full @[780px]:w-auto
      aspect-square shadow-xl overflow-hidden rounded-md border-2`}
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
*/
