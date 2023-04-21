import BishopPieceIcon from "@/components/icons/Bishop";
import KingPieceIcon from "@/components/icons/King";
import KnightPieceIcon from "@/components/icons/Knight";
import PawnPieceIcon from "@/components/icons/Pawn";
import QueenPieceIcon from "@/components/icons/Queen";
import RookPieceIcon from "@/components/icons/Rook";

interface Props {
  square: TSquare;
  onClick: (square: TSquare) => void;
  selectedSquare: TSquare | null;
  possibleMoves: string[];
  odd: boolean;
}

const PeaceIcon = ({ name, color }: { name: string; color: string }) => {
  if (name === "Pawn") return <PawnPieceIcon color={color} />;
  if (name === "Rook") return <RookPieceIcon color={color} />;
  if (name === "Knight") return <KnightPieceIcon color={color} />;
  if (name === "Bishop") return <BishopPieceIcon color={color} />;
  if (name === "King") return <KingPieceIcon color={color} />;
  if (name === "Queen") return <QueenPieceIcon color={color} />;
  return <></>;
};

export default function BoardSquare({
  square,
  onClick,
  selectedSquare,
  possibleMoves,
  odd,
}: Props) {
  const { x, y } = square.position;

  const selected =
    String(selectedSquare?.position.x) + String(selectedSquare?.position.y) ===
    `${x}${y}`;

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
          ? "border-4 border-[#C1B225]"
          : possibleMoves.includes(`${x}-${y}`)
          ? "border-4 border-[#00C898]"
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

// import("public")
