import BishopPieceIcon from "@/components/icons/Bishop";
import KingPieceIcon from "@/components/icons/King";
import KnightPieceIcon from "@/components/icons/Knight";
import PawnPieceIcon from "@/components/icons/Pawn";
import QueenPieceIcon from "@/components/icons/Queen";
import RookPieceIcon from "@/components/icons/Rook";

const PeaceIcon = ({ name, color }: { name: string; color: string }) => {
  if (name === "Pawn") return <PawnPieceIcon color={color} />;
  if (name === "Rook") return <RookPieceIcon color={color} />;
  if (name === "Knight") return <KnightPieceIcon color={color} />;
  if (name === "Bishop") return <BishopPieceIcon color={color} />;
  if (name === "King") return <KingPieceIcon color={color} />;
  if (name === "Queen") return <QueenPieceIcon color={color} />;
  return <></>;
};

export default PeaceIcon;
