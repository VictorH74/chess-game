import PeaceIcon from "../PieceIcon";
import { createPiece } from "@/utils/functions";
import Board from "../Board";
import { pieceNames } from "@/utils/constants";
import { useGameCtx } from "@/contexts/GameContext";
import { useBoardCtx } from "@/contexts/BoardContext";

export default function GameBoard() {
  const gameCtx = useGameCtx();
  const boardCtx = useBoardCtx();

  return (
    <>
      <Board />

      <div
        className={`absolute bg-[#00000030] inset-0 duration-200 flex flex-wrap items-center justify-center p-2 gap-6 ${
          gameCtx.showModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {gameCtx.winner ? (
          <div className="text-center uppercase">
            <h1 className=" @[350px]:text-2xl font-semibold">
              {gameCtx.winner} player won!!
            </h1>
            <button
              onClick={location.reload}
              className="uppercase bg-blue-400 m-2 py-2 px-5 rounded-md hover:scale-110 duration-150"
            >
              restart
            </button>
          </div>
        ) : boardCtx.replacementPeace ? (
          pieceNames.map(
            (name) =>
              name !== "Pawn" && (
                <div
                  key={name}
                  className="w-[13%] hover:scale-125 duration-200"
                  onClick={() =>
                    boardCtx.chooseReplacementPiece(
                      createPiece(
                        name,
                        boardCtx.replacementPeace?.piece?.color || "black"
                      )
                    )
                  }
                >
                  <PeaceIcon
                    name={name || "Pawn"}
                    color={boardCtx.replacementPeace?.piece?.color || "black"}
                  />
                </div>
              )
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}
