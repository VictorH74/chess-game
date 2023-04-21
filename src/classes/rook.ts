export class RookPiece {
  public static possibleMoves(
    board: TSquare[][],
    selectedRow: number,
    selectedCol: number,
    color: string
  ) {
    let moves = [];

    // RIGHT
    for (let col = selectedCol; col < 7; col++) {
      if (!board[selectedRow][col + 1].piece) {
        moves.push(`${selectedRow}-${col + 1}`);
      } else if (board[selectedRow][col + 1].piece?.color === color) {
        break;
      } else if (board[selectedRow][col + 1].piece?.color !== color) {
        moves.push(`${selectedRow}-${col + 1}`);
        break;
      }
    }

    // LEFT
    for (let col = selectedCol; col > 0; col--) {
      if (!board[selectedRow][col - 1].piece) {
        console.log(board[selectedRow][col - 1]);
        moves.push(`${selectedRow}-${col - 1}`);
      } else if (board[selectedRow][col - 1].piece?.color === color) {
        break;
      } else if (board[selectedRow][col - 1].piece?.color !== color) {
        moves.push(`${selectedRow}-${col - 1}`);
        break;
      }
    }

    // UP
    for (let row = selectedRow; row < 7; row++) {
      if (!board[row + 1][selectedCol].piece) {
        console.log(board[row + 1][selectedCol]);
        moves.push(`${row + 1}-${selectedCol}`);
      } else if (board[row + 1][selectedCol].piece?.color === color) {
        break;
      } else if (board[row + 1][selectedCol].piece?.color !== color) {
        moves.push(`${row + 1}-${selectedCol}`);
        break;
      }
    }

    // DOWN
    for (let row = selectedRow; row > 0; row--) {
      if (!board[row - 1][selectedCol].piece) {
        console.log(board[row - 1][selectedCol]);
        moves.push(`${row - 1}-${selectedCol}`);
      } else if (board[row - 1][selectedCol].piece?.color === color) {
        break;
      } else if (board[row - 1][selectedCol].piece?.color !== color) {
        moves.push(`${row - 1}-${selectedCol}`);
        break;
      }
    }
    return moves;
  }
}
