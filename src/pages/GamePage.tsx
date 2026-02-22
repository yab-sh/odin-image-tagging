import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import { fetchCharacters, saveGameResult } from "../api";
import { NotifModal } from "../components/modals/NotifModal";
import "./GamePage.css";

interface Character {
  id: string;
  name: string;
  centerX: number;
  centerY: number;
  radius: number;
}

export default function GamePage() {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [targets, setTargets] = useState<Character[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const { time, setTime, running, setRunning, player } = useGame();

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchCharacters();
        setCharacters(data);

        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setTargets(shuffled.slice(0, 3));
      } catch (error: any) {
        setError(error.response?.data?.error || "Failed to load characters");
        console.error("Failed to load characters:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  // Timer
  useEffect(() => {
    let interval: number;

    if (running) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running, setTime]);

  useEffect(() => {
      if (targets.length > 0 && found.length === targets.length && running) {
        setRunning(false);
        setCompletionTime(time);

        if (player) {
          saveGameResult(player.id, time)
            .then(() => {
            })
            .catch(err => console.error('Failed to save result:', err));
        }

        setShowWinModal(true);
      }
    }, [found, targets, time, running, setRunning, player]);

  const handleImageLoad = () => {
    setRunning(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCursor({ x, y });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!imageRef.current || !selectedTarget) return;

    const rect = imageRef.current.getBoundingClientRect();

    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;

    targets.forEach((target) => {
      if (found.includes(target.id) || target.id !== selectedTarget) return;

      const dx = clickX - target.centerX;
      const dy = clickY - target.centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= target.radius) {
        setFound((prev) => [...prev, target.id]);
        setSelectedTarget(null);
      }
    });
  };

  const handleWinModalClose = () => {
    setShowWinModal(false);
    // Optionally reset the game or navigate away
    // navigate('/leaderboard'); // if you want to redirect immediately
  };

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="game-page">
      <div className="target-bar">
        {targets.map((target) => (
          <div
            key={target.id}
            className={`target-item 
              ${found.includes(target.id) ? "found" : ""} 
              ${selectedTarget === target.id ? "selected" : ""}
            `}
            onClick={() => {
              if (!found.includes(target.id)) {
                setSelectedTarget(target.id);
              }
            }}
          >
            {target.name}
          </div>
        ))}
      </div>

      <div className="image-wrapper">
        <img
          ref={imageRef}
          src="/images/phototagging.jpg"
          alt="Game"
          onLoad={handleImageLoad}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className="game-image"
        />

        <div
          className="target-cursor"
          style={{
            left: `${cursor.x * 100}%`,
            top: `${cursor.y * 100}%`,
            opacity: selectedTarget ? 1 : 0.5,
            border: selectedTarget ? '2px solid var(--color-primary)' : '1px solid white'
          }}
        />
      </div>

      <NotifModal
        isOpen={showWinModal}
        onClose={handleWinModalClose}
        completionTime={completionTime}
        isNewRecord={isNewRecord}
      />
    </div>
  );
}