import { TSquare } from "@/types";
import BoardSquare from "../BoardSquare";
import { useBoardCtx } from "@/contexts/BoardContext";

export default function Board() {
  const boardCtx = useBoardCtx();
  return (
    <div
      className={`h-full aspect-square shadow-xl overflow-hidden rounded-md`}
    >
      {boardCtx.board.map((row: TSquare[], rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {row.map((square: TSquare, colIndex) => (
            <BoardSquare
              key={colIndex}
              odd={(rowIndex + colIndex) % 2 !== 0}
              square={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
