type TSquare = {
  piece: TPiece;
  position: TPosition;
};

type TPiece = {
  color: TPieceColor;
  name: TPieceName;
} | null;

type TBoard = TSquare[][]

type TPosition = { row: number; col: number };

type TPieceName = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King"

type TPieceColor = "black" | "white"
