export const getPiecebyPosition = (position: TPosition): TPiece => {
    let { row, col } = position;
    let color =
      row === 0 || row === 1
        ? "white"
        : row === 7 || row === 6
        ? "black"
        : undefined;
  
    if (!color) return null;
  
    if ((col === 0 || col === 7) && (row === 0 || row === 7))
      return { color, name: "Rook" };
    if ((col === 1 || col === 6) && (row === 0 || row === 7))
      return { color, name: "Knight" };
    if ((col === 2 || col === 5) && (row === 0 || row === 7))
      return { color, name: "Bishop" };
    if (col === 3 && (row === 0 || row === 7)) return { color, name: "Queen" };
    if (col === 4 && (row === 0 || row === 7)) return { color, name: "King" };
  
    return { color, name: "Pawn" };
  };