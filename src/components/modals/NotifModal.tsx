import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotifModal.css';

interface NotifModalProps {
  isOpen: boolean;
  onClose: () => void;
  completionTime: number; // in milliseconds
  isNewRecord?: boolean;
}

export const NotifModal: React.FC<NotifModalProps> = ({ 
  isOpen, 
  onClose, 
  completionTime,
  isNewRecord = false 
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number; size: number; color: string }>>([]);

  // Format time from milliseconds to MM:SS.ms
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  // Generate confetti pieces
  useEffect(() => {
    if (isOpen) {
      const colors = ['#ffb400', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setConfettiPieces(pieces);
    }
  }, [isOpen]);

  // Countdown and auto-redirect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleRedirect = () => {
    onClose();
    navigate('/leaderboard');
  };

  if (!isOpen) return null;

  return (
    <div className="notif-modal-overlay" onClick={onClose}>
      <div className="notif-modal" onClick={e => e.stopPropagation()}>
        {/* Confetti Animation */}
        <div className="confetti-container">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="confetti"
              style={{
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${piece.size * 1.5}px`,
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="notif-modal-content">
          <h2 className="notif-modal-title">
            🎉 Congratulations! 🎉
          </h2>
          
          <div className="notif-modal-message">
            <p>You found all characters!</p>
            <div className="completion-time">
              <span className="time-label">Your time:</span>
              <span className="time-value">{formatTime(completionTime)}</span>
            </div>
            {isNewRecord && (
              <div className="new-record-badge">
                ⭐ New Record! ⭐
              </div>
            )}
          </div>

          <div className="notif-modal-footer">
            <p className="redirect-message">
              Redirecting to leaderboard in <strong>{timeLeft}</strong> seconds...
            </p>
            <button 
              className="redirect-button"
              onClick={handleRedirect}
            >
              Go to Leaderboard Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};