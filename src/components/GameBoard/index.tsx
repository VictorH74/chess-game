import PeaceIcon from "../PieceIcon";
import { createPiece } from "@/utils/functions";
import Board from "../Board";
import { pieceNames } from "@/utils/constants";
import { useGameCtx } from "@/contexts/GameContext";
import { useBoardCtx } from "@/contexts/BoardContext";
import React from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

type TScreen = "full" | "minimized";

interface GameBoardProps {
  closeGame(): void
}

export default function GameBoard(props: GameBoardProps) {
  const [screen, setScreen] = React.useState<TScreen>("minimized");

  const boardCtx = useBoardCtx();
  const gameCtx = useGameCtx();

  React.useEffect(() => {
    const screenStr = localStorage.getItem("fullScreeChessGame") as TScreen;
    if (!screenStr) return;

    setScreen(screenStr);
  }, []);

  const fullScreen = () => {
    setScreen("full");
    localStorage.setItem("fullScreeChessGame", "full");
  };

  const minimizedScreen = () => {
    setScreen("minimized");
    localStorage.setItem("fullScreeChessGame", "minimized");
  };

  return (
    <>
      <div className="uppercase absolute mt-3 text-center text-lg left-1/2 z-50 -translate-x-1/2">
        <p className="font-bold text-blue-400 underline">
          {gameCtx.currentPlayer} player time
        </p>
      </div>

      <div
        className={`
          h-[95vh]
          @[700px]:h-screen 
          flex 
          flex-col
          gap-2
          @[1000px]:flex-row
          items-center 
          justify-center
          @container
        `}
      >
        <div
          className="
        flex 
        @[1020px]:flex-col 
        min-h-[48px] 
        min-w-[48px] 
        flex-wrap 
        justify-center 
        px-2
        "
        >
          {gameCtx.deadBlackPiaces.map((piece, i) => (
            <div className="h-12" key={i}>
              <PeaceIcon
                name={piece?.name || "Pawn"}
                color={piece?.color || "black"}
              />
            </div>
          ))}
        </div>

        <div
          className={`
          ${
            screen === "full"
              ? "@[1020px]:h-full "
              : "@[1020px]:h-full @[1020px]:max-h-[70%]"
          } 
          w-full @[1020px]:w-auto
          relative
        `}
        >
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
                  onClick={props.closeGame}
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
                            boardCtx.replacementPeace?.piece?.color || "black",
                          ),
                        )
                      }
                    >
                      <PeaceIcon
                        name={name || "Pawn"}
                        color={
                          boardCtx.replacementPeace?.piece?.color || "black"
                        }
                      />
                    </div>
                  ),
              )
            ) : (
              ""
            )}
          </div>

          <div className="p-2 mx-auto hidden @[1020px]:block absolute -right-16 top-1">
            {screen === "full" ? (
              <button onClick={minimizedScreen}>
                <FullscreenIcon sx={{ fontSize: 55 }} />
              </button>
            ) : (
              <button onClick={fullScreen}>
                <FullscreenExitIcon sx={{ fontSize: 55 }} />
              </button>
            )}
          </div>
        </div>

        <div
          className="
        flex @[1020px]:flex-col 
        flex-wrap 
        justify-center 
        px-2
        min-h-[48px] 
        min-w-[48px] 
        "
        >
          {gameCtx.deadWhitePiaces.map((piece, i) => (
            <div className="h-12" key={i}>
              <PeaceIcon
                name={piece?.name || "Pawn"}
                color={piece?.color || "black"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
