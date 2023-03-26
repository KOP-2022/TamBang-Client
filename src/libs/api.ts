import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : '/api',
  credentials: 'include',
});
