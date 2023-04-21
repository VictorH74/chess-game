import BoardSquare from "../BoardSquare";

interface Props {
  board: TSquare[][];
  squareHandleClick: (square: TSquare) => void;
  selectedSquare: TSquare | null;
  possibleMoves: string[];
}

export default function Board(props: Props) {
  return (
    <div
      className={`
      h-full
      aspect-square shadow-xl overflow-hidden rounded-md
      `}
    >
      {props.board.map((row: TSquare[], rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((square: TSquare, colIndex) => (
            <BoardSquare
              key={colIndex}
              odd={(rowIndex + colIndex) % 2 !== 0}
              square={square}
              onClick={props.squareHandleClick}
              selectedSquare={props.selectedSquare}
              possibleMoves={props.possibleMoves}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
