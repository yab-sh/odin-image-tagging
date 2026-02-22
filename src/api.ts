import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerPlayer = async (nickname: string, secret: string) => {
  try {
    const res = await api.post('/auth/register', { nickname, secret });
    return res.data;
  } catch (err: any) {
    console.error('Register error', err.response?.data || err.message);
    throw err;
  }
};

export const loginPlayer = async (nickname: string, secret: string) => {
  try {
    const res = await api.post('/auth/login', { nickname, secret });
    return res.data;
  } catch (err: any) {
    console.error('Login error', err.response?.data || err.message);
    throw err;
  }
};

export const fetchLeaderboard = async (limit = 5) => {
  try {
    const res = await api.get(`/leaderboard?limit=${limit}`);
    return res.data;
  } catch (err: any) {
    console.error('Leaderboard fetch error', err.response?.data || err.message);
    throw err;
  }
};

export const fetchCharacters = async (photoId?: string) => {
  try {
    const url = photoId ? `/characters?photoId=${photoId}` : '/characters';
    const res = await api.get(url);
    return res.data;
  } catch (err: any) {
    console.error('Characters fetch error', err.response?.data || err.message);
    throw err;
  }
};

export const saveGameResult = async (playerId: string, durationMs: number) => {
  try {
    const res = await api.post('/game/save-result', { playerId, durationMs });
    return res.data;
  } catch (err: any) {
    console.error('Save result error', err.response?.data || err.message);
    throw err;
  }
};