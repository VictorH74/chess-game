export class PawnPiece {
  public static possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
    color: string,
    nullCondition?: boolean
  ): string[] {
    let moves = [];

    if ( // Check if the pawn front is there not piece
      (color === "black" ? selectedRow > 0 : selectedRow < 7) &&
      board[color === "black" ? selectedRow - 1 : selectedRow + 1][selectedCol]
        .piece === null
    ) {
      moves.push(
        `${
          color === "black" ? selectedRow - 1 : selectedRow + 1
        }-${selectedCol}`
      );

      // Check if the WHITE pawn still not make the first moviment
      if (color === "white" && selectedRow === 1) {
        moves.push(
          ...this.possibleMoves(
            board,
            selectedRow + 1,
            selectedCol,
            color,
            true
          )
        );
        // Check if the BLACK pawn still not make the first moviment
      } else if (color === "black" && selectedRow === 6) {
        moves.push(
          ...this.possibleMoves(
            board,
            selectedRow - 1,
            selectedCol,
            color,
            true
          )
        );
      }
    }
    if (color === "white" && !nullCondition) {
      if (
        // LEFT
        selectedCol > 0 &&
        selectedRow < 7 &&
        board[selectedRow + 1][selectedCol - 1].piece?.color === "black"
      ) {
        moves.push(`${selectedRow + 1}-${selectedCol - 1}`);
      }
      if (
        // RIGHT
        selectedCol < 7 &&
        selectedRow < 7 &&
        board[selectedRow + 1][selectedCol + 1].piece?.color === "black"
      ) {
        moves.push(`${selectedRow + 1}-${selectedCol + 1}`);
      }
    } else if (color === "black" && !nullCondition) {
      if (
        // LEFT
        selectedCol > 0 &&
        selectedRow > 0 &&
        board[selectedRow - 1][selectedCol - 1].piece?.color === "white"
      ) {
        moves.push(`${selectedRow - 1}-${selectedCol - 1}`);
      }
      if (
        // RIGHT
        selectedCol < 7 &&
        selectedRow > 0 &&
        board[selectedRow - 1][selectedCol + 1].piece?.color === "white"
      ) {
        moves.push(`${selectedRow - 1}-${selectedCol + 1}`);
      }
    }

    return moves;
  }
}
