import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GameCtxProvider from "./contexts/GameContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameCtxProvider>
      <App />
    </GameCtxProvider>
  </React.StrictMode>
);
