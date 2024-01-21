import { TPieceClass, TPieceColor } from "@/types";
import React from "react";

export interface GameCtxProps {
  currentPlayer: TPieceColor;
  deadBlackPiaces: TPieceClass[];
  deadWhitePiaces: TPieceClass[];
  changeCurrentPlayer: () => void;
  incrementDeadPieces: (piece: TPieceClass) => void;
  winner: TPieceColor | undefined;
  defineWinner: (color: TPieceColor) => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void
}

const defaultValue: GameCtxProps = {
  currentPlayer: "white",
  deadBlackPiaces: [],
  deadWhitePiaces: [],
  changeCurrentPlayer: () => {},
  incrementDeadPieces: () => {},
  winner: undefined,
  defineWinner: () => {},
  showModal: false,
  setShowModal: () => {}
};

const gameCtx = React.createContext(defaultValue);

export const useGameCtx = () => React.useContext(gameCtx);

const GameCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPlayer, setCurrentPlayer] = React.useState<"white" | "black">(
    "white"
  );
  const [deadBlackPiaces, setDeadBlackPieces] = React.useState<TPieceClass[]>(
    []
  );
  const [deadWhitePiaces, setDeadWhitePieces] = React.useState<TPieceClass[]>(
    []
  );
  const [showModal, setShowModalState] = React.useState(false);
  const [winner, setWinner] = React.useState<TPieceColor | undefined>();

  const setShowModal = (value: boolean) => setShowModalState(value)

  const incrementDeadPieces = React.useCallback(
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

  const changeCurrentPlayer = React.useCallback(() => {
    setCurrentPlayer((prev) => (prev === "white" ? "black" : "white"));
  }, [currentPlayer]);

  const defineWinner = (color: TPieceColor) => {
    setWinner(color);
    setShowModal(true);
  };

  return (
    <gameCtx.Provider
      value={{
        currentPlayer,
        deadBlackPiaces,
        deadWhitePiaces,
        changeCurrentPlayer,
        incrementDeadPieces,
        winner,
        defineWinner,
        showModal,
        setShowModal
      }}
    >
      {children}
    </gameCtx.Provider>
  );
};

export default GameCtxProvider;
