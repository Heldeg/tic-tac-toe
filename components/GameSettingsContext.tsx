import React, { createContext, useContext, useState } from "react";
import type { DifficultyLevel } from "../domain/model/GameLogic";

type GameSettingsContextType = {
  difficulty: DifficultyLevel;
  setDifficulty: (value: DifficultyLevel) => void;
};

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(undefined);

export function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("MEDIUM");

  return (
    <GameSettingsContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error("useGameSettings must be used within a GameSettingsProvider");
  }
  return context;
}
