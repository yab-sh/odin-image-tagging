import { useState } from 'react';
import { registerPlayer, loginPlayer } from '../../api';
import { useGame } from '../../context/GameContext';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'returning'>('new');
  const [nickname, setNickname] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useGame();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      
      try {
        let response;
        if (activeTab === 'new') {
          response = await registerPlayer(nickname, secret);
          console.log('Registered:', response);
          // For new registration, the response contains player data
          login(response.player);
        } else {
          response = await loginPlayer(nickname, secret);
          console.log('Logged in:', response);
          // For login, the response contains player data
          login(response.player);
        }
        
        onClose();
        onSuccess?.();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <div className="auth-modal-tabs">
          <button
            className={activeTab === 'new' ? 'active' : ''}
            onClick={() => setActiveTab('new')}
          >
            New Player
          </button>
          <button
            className={activeTab === 'returning' ? 'active' : ''}
            onClick={() => setActiveTab('returning')}
          >
            Returning Player
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal-form">
          {error && <div className="auth-modal-error">{error}</div>}
          
          <label>
            Nickname
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your nickname"
            />
          </label>

          <label>
            Secret
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              required
              disabled={loading}
              placeholder={activeTab === 'new' ? 'Choose a secret' : 'Enter your secret'}
            />
          </label>

          {activeTab === 'new' && (
            <small className="auth-modal-hint">
              ⚠️ Save this secret! You'll need it to login next time.
            </small>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (activeTab === 'new' ? 'Register' : 'Login')}
          </button>
        </form>
      </div>
    </div>
  );
};