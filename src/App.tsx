import { useState } from "react";
import GameBoard from "./components/GameBoard";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function App() {
  const [screen, setScreen] = useState<"full" | "minimized">("minimized");

  const fullScreen = () => setScreen("full")

  const minimizedScreen = () => setScreen("minimized")

  return (
    <div className="h-screen flex justify-center items-center @container">
      <div
        className={`
          ${
            screen === "full"
              ? "@[1115px]:h-full "
              : "@[800px]:h-full @[800px]:max-h-[70%]"
          } 
          w-full @[800px]:w-auto
          flex
          flex-wrap
          @[950px]:flex-nowrap
          overflow-auto
        `}
      >
        <GameBoard screen={screen} />
        <div className="p-2 mx-auto hidden @[800px]:block">
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
    </div>
  );
}

export default App;

/*
<div className="h-screen flex justify-center items-center @container border-2 ">
      <GameBoard screen={screen} />
      <div className="border-2 ">SetScreen</div>
    </div>
*/
