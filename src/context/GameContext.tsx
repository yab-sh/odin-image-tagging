import { createContext, useContext, useState, type ReactNode } from 'react';

interface Player {
  id: string;
  nickname: string;
}

interface GameContextType {
  time: number;
  setTime: (time: number | ((prev: number) => number)) => void;
  running: boolean;
  setRunning: (running: boolean) => void;
  // Auth state
  isAuthenticated: boolean;
  player: Player | null;
  login: (player: Player) => void;
  logout: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [player, setPlayer] = useState<Player | null>(() => {
    // Check localStorage for existing session
    const savedPlayer = localStorage.getItem('player');
    return savedPlayer ? JSON.parse(savedPlayer) : null;
  });

  const isAuthenticated = !!player;

  const login = (playerData: Player) => {
    setPlayer(playerData);
    localStorage.setItem('player', JSON.stringify(playerData));
  };

  const logout = () => {
    setPlayer(null);
    localStorage.removeItem('player');
  };

  return (
    <GameContext.Provider value={{ 
      time, 
      setTime, 
      running, 
      setRunning,
      isAuthenticated,
      player,
      login,
      logout
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}