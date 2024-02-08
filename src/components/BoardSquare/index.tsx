import PeaceIcon from "@/components/PieceIcon";
import { useBoardCtx } from "@/contexts/BoardContext";
import { TSquare } from "@/types";
import useBoardSquare from "./useBoardSquare";

interface Props {
  square: TSquare;
  odd: boolean;
}

export default function BoardSquare({ square, odd }: Props) {
  const boardCtx = useBoardCtx();
  const { selectPiece, movePiece } = useBoardSquare();
  const { row, col } = square.position;

  const highlighted =
    String(boardCtx.highlightedSquare?.position.row) +
      String(boardCtx.highlightedSquare?.position.col) ===
    `${row}${col}`;

  return (
    <div
      className={`w-full aspect-square border-[1px] border-[#292929] ${
        odd ? "bg-[#858585]" : "bg-[#292929]"
      } `}
    >
      <div
        onClick={() =>
          (boardCtx.highlightedSquare ? movePiece : selectPiece)(square)
        }
        className={`w-full h-full grid place-items-center ${
          highlighted
            ? "border-4 border-blue-400"
            : boardCtx.possibleMoves.includes(`${row}-${col}`)
            ? "border-4 border-teal-500"
            : boardCtx.opponentCheckMoves.includes(`${row}-${col}`)
            ? "border-4 border-red-700"
            : ""
        }`}
      >
        {square.piece?.name && square.piece?.color && (
          <PeaceIcon
            name={square.piece?.name || "Pawn"}
            color={square.piece?.color || "black"}
          />
        )}
      </div>
    </div>
  );
}
