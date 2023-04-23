import { useEffect, useState, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PeaceIcon from "./components/PieceIcon";
import { TPieceClass } from "./types";

type TScreen = "full" | "minimized";

function App() {
  const [screen, setScreen] = useState<TScreen>("minimized");
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">(
    "white"
  );
  const [deadBlackPiaces, setDeadBlackPieces] = useState<TPieceClass[]>([]);
  const [deadWhitePiaces, setDeadWhitePieces] = useState<TPieceClass[]>([]);

  useEffect(() => {
    const screenStr = localStorage.getItem("fullScreeChessGame") as TScreen;
    if (!screenStr) return;

    setScreen(screenStr);
  }, []);

  const reset = () => {
    setCurrentPlayer("white");
    setDeadBlackPieces([]);
    setDeadWhitePieces([]);
  };

  const incrementDeadPieces = useCallback(
    (piece: TPieceClass) => {
      if (!piece) return;

      if (piece.color === "black") {
        setDeadBlackPieces((prev) => [...prev, piece]);
      } else if (piece.color === "white") {
        setDeadWhitePieces((prev) => [...prev, piece]);
      }
    },
    [deadBlackPiaces, deadWhitePiaces]
  );

  const changeCurrentPlayer = useCallback(() => {
    setCurrentPlayer((prev) => (prev === "white" ? "black" : "white"));
  }, [currentPlayer]);

  const fullScreen = () => {
    setScreen("full");
    localStorage.setItem("fullScreeChessGame", "full");
  };

  const minimizedScreen = () => {
    setScreen("minimized");
    localStorage.setItem("fullScreeChessGame", "minimized");
  };

  return (
    <main className="@container">
      <div className="uppercase absolute mt-3 text-center text-lg left-1/2 z-50 -translate-x-1/2">
        <p className="font-bold text-blue-400 underline">
          {currentPlayer} player time
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
        <div className="
        flex 
        @[1020px]:flex-col 
        min-h-[48px] 
        min-w-[48px] 
        flex-wrap 
        justify-center 
        px-3">
          {deadBlackPiaces.map((piece, i) => (
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
          <GameBoard
            currentPlayer={currentPlayer}
            changeCurrentPlayer={changeCurrentPlayer}
            incrementDeadPieces={incrementDeadPieces}
            reset={reset}
          />

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

        <div className="
        flex @[1020px]:flex-col 
        flex-wrap 
        justify-center 
        px-3
        min-h-[48px] 
        min-w-[48px] 
        ">
          {deadWhitePiaces.map((piece, i) => (
            <div className="h-12" key={i}>
              <PeaceIcon
                name={piece?.name || "Pawn"}
                color={piece?.color || "black"}
              />
            </div>
          ))}
        </div>
      </div>
      <footer className="text-center p-4">
        <p>&copy; Created by Victor Almeida 2023</p>
      </footer>
    </main>
  );
}

export default App;
