export class KingPiece {
  public static possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
    color: string
  ) {
    let moves = [];

    // UP
    if (
      selectedRow - 1 >= 0 &&
      board[selectedRow - 1][selectedCol].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol}`);
    }

    // UP LEFT
    if (
      selectedRow - 1 >= 0 &&
      selectedCol - 1 >= 0 &&
      board[selectedRow - 1][selectedCol - 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol - 1}`);
    }

    // LEFT
    if (
      selectedCol - 1 >= 0 &&
      board[selectedRow][selectedCol - 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow}-${selectedCol - 1}`);
    }

    // DOWN LEFT
    if (
      selectedRow + 1 <= 7 &&
      selectedCol - 1 >= 0 &&
      board[selectedRow + 1][selectedCol - 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol - 1}`);
    }

    // DOWN
    if (
      selectedRow + 1 <= 7 &&
      board[selectedRow + 1][selectedCol].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol}`);
    }

    // DOWN RIGHT
    if (
      selectedRow + 1 <= 7 &&
      selectedCol + 1 <= 7 &&
      board[selectedRow + 1][selectedCol + 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol + 1}`);
    }

    // RIGHT
    if (
      selectedCol + 1 <= 7 &&
      board[selectedRow][selectedCol + 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow}-${selectedCol + 1}`);
    }

    // UP RIGHT
    if (
      selectedRow - 1 >= 0 &&
      selectedCol + 1 <= 7 &&
      board[selectedRow - 1][selectedCol + 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol + 1}`);
    }

    return moves;
  }
}
