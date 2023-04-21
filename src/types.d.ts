type TSquare = {
  piece: TPiece;
  position: TPosition;
};

type TPiece = {
  color: string;
  name: string;
} | null;

type TPosition = { x: number; y: number };
