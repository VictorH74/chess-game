type TSquare = {
  piece: TPiece;
  position: TPosition;
};

type TPiece = {
  color: string;
  name: string;
} | null;

type TPosition = { row: number; col: number };
