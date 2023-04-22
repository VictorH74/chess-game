import { TPieceClass } from "@/classes/base";
import PeaceIcon from "@/components/PieceIcon";

export type TSquare = {
  piece: TPieceClass | null;
  position: TPosition;
};

export type TPosition = { row: number; col: number };

interface Props {
  square: TSquare;
  onClick: (square: TSquare) => void;
  selectedSquare: TSquare | null;
  possibleMoves: string[];
  dangerPositions: string[];
  odd: boolean;
}

export default function BoardSquare({
  square,
  onClick,
  selectedSquare,
  possibleMoves,
  dangerPositions,
  odd,
}: Props) {
  const { row, col } = square.position;

  const selected =
    String(selectedSquare?.position.row) +
      String(selectedSquare?.position.col) ===
    `${row}${col}`;

  return (
    <div
      className={`
      w-full aspect-square border-[1px] border-[#292929]
      ${odd ? "bg-[#858585]" : "bg-[#292929]"} 
      `}
    >
      <div
        onClick={() => onClick(square)}
        className={`w-full h-full grid place-items-center
      ${
        selected
          ? "border-4 border-blue-400"
          : possibleMoves.includes(`${row}-${col}`)
          ? "border-4 border-teal-500"
          : dangerPositions.includes(`${row}-${col}`)
          ? "border-4 border-red-700"
          : ""
      }
      `}
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
