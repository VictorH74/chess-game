import React from "react";
import GameBoard from "./components/GameBoard";
import BoardCtxProvider from "./contexts/BoardContext";
import GameCtxProvider from "./contexts/GameContext";

function App() {
  const [startedGame, setStartedGame] = React.useState(false);

  return (
    <main className="@container flex flex-col h-screen">
      {startedGame ? (
        <GameCtxProvider>
          <BoardCtxProvider key={startedGame ? "game" : "menu"}>
            <GameBoard closeGame={() => setStartedGame(false)} />
          </BoardCtxProvider>
        </GameCtxProvider>
      ) : (
        <div className="grow grid place-items-center">
          <div className="w-full max-w-2xl h-7s bg-zinc-600 p-6 rounded-lg text-center flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Chess Game</h2>
              <p className="text-base">Play with some friend!</p>
            </div>
            <button className="py-2 px-3 bg-blue-400 rounded-lg hover:brightness-110 duration-300 hover:shadow-lg" onClick={() => setStartedGame(true)}>
              Start Game
            </button>
          </div>
        </div>
      )}

      <footer className="text-center p-4 mt-auto">
        <p>&copy; Created by Victor Almeida 2023</p>
      </footer>
    </main>
  );
}

export default App;
