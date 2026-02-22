import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api';
import './LeaderBoardPage.css';

interface LeaderboardEntry {
  nickname: string;
  bestTimeMs: number;
}

export default function LeaderBoardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  if (loading) {
    return <div className="leader-board-page loading">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="leader-board-page error">Error: {error}</div>;
  }

  return (
    <div className="leader-board-page">
      <h1>Leaderboard</h1>
      
      {leaderboard.length === 0 ? (
        <p className="no-players">No players yet. Be the first!</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Best Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className={index < 3 ? `top-${index + 1}` : ''}>
                <td className="rank">{index + 1}</td>
                <td className="player-name">{entry.nickname}</td>
                <td className="player-time">{formatTime(entry.bestTimeMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}