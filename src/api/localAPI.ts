import { jwtDecode } from 'jwt-decode';

interface TokenData {
  exp: number; // Expiration time in seconds
  sub: string; // Subject (user ID)
}

const localAPI = {
  setToken: (token: string) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  getTokenData() {
    const token = localStorage.getItem('token');
    let tokenDecoded = null;

    if (token) {
      tokenDecoded = jwtDecode<TokenData>(token);
    }
    return tokenDecoded;
  },
  deleteToken: () => localStorage.removeItem('token'),
};

export default localAPI;
