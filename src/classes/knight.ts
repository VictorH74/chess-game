export class KnightPiece {
  public static possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
    color: string
  ) {
    let moves = [];

    if (
      // right-up
      selectedCol + 2 <= 7 &&
      selectedRow - 1 >= 0 &&
      board[selectedRow - 1][selectedCol + 2].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol + 2}`);
    }

    if (
      // right-down
      selectedCol + 2 <= 7 &&
      selectedRow + 1 <= 7 &&
      board[selectedRow + 1][selectedCol + 2].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol + 2}`);
    }

    if (
      // left-up
      selectedCol - 2 >= 0 &&
      selectedRow - 1 >= 0 &&
      board[selectedRow - 1][selectedCol - 2].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 1}-${selectedCol - 2}`);
    }

    if (
      // left-down
      selectedCol - 2 >= 0 &&
      selectedRow + 1 <= 7 &&
      board[selectedRow + 1][selectedCol - 2].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 1}-${selectedCol - 2}`);
    }

    if (
      // up-right
      selectedCol + 1 <= 7 &&
      selectedRow - 2 >= 0 &&
      board[selectedRow - 2][selectedCol + 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 2}-${selectedCol + 1}`);
    }

    if (
      // up-left
      selectedCol - 1 >= 0 &&
      selectedRow - 2 >= 0 &&
      board[selectedRow - 2][selectedCol - 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow - 2}-${selectedCol - 1}`);
    }

    if (
      // down - right
      selectedCol + 1 <= 7 &&
      selectedRow + 2 <= 7 &&
      board[selectedRow + 2][selectedCol + 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 2}-${selectedCol + 1}`);
    }

    if (
      // down-left
      selectedCol - 1 >= 0 &&
      selectedRow + 2 <= 7 &&
      board[selectedRow + 2][selectedCol - 1].piece?.color !== color
    ) {
      moves.push(`${selectedRow + 2}-${selectedCol - 1}`);
    }

    return moves
  }
}
