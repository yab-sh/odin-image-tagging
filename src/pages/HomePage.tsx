import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLeaderboard } from '../api';
import { useGame } from '../context/GameContext';
import { AuthModal } from '../components/modals/AuthModal';
import './HomePage.css'

interface LeaderboardEntry {
  nickname: string;
  bestTimeMs: number;
}

export default function HomePage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { isAuthenticated, player } = useGame();
    const navigate = useNavigate();

    useEffect(() => {
        const loadLeaderboard = async () => {
        try {
            const data = await fetchLeaderboard(5);
            setLeaderboard(data);
        } catch {}
        };
        loadLeaderboard();
    }, []);

    const handlePlayClick = () => {
        if (isAuthenticated) {
            navigate('/game');
        } else {
            setShowAuthModal(true);
        }
    };

    const handleAuthSuccess = () => {
        navigate('/game');
    };

    return (
        <div className="home-page">
            <div className="home-background" />

            <div className="home-content">
                <div className="home-main">
                    <h1>Find'em!</h1>
                    <p className="home-description">
                        Find all hidden characters in the image as fast as you can. Compete with friends and climb the leaderboard!
                    </p>
                    
                    {isAuthenticated && (
                        <div className="welcome-message">
                            Welcome back, <strong>{player?.nickname}</strong>! Ready to play?
                        </div>
                    )}
                    
                    <button className="play-button" onClick={handlePlayClick}>
                        {isAuthenticated ? 'Play Game' : 'Login to Play'}
                    </button>
                </div>

                <aside className="home-sidebar">
                    <h2>Top Players</h2>
                    <ul className="leaderboard-list">
                        {leaderboard.length === 0 ? (
                            <p>No players yet. Be the first!</p>
                        ) :
                        leaderboard.map((entry, index)=> (
                            <li key={index}>
                                <span className="player-rank">{index + 1}.</span>
                                <span className="player-name">{entry.nickname}</span>
                                <span className="player-time">{Math.floor(entry.bestTimeMs / 1000)}s</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <AuthModal 
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />
        </div>
    );
}