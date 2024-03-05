import { jwtDecode } from 'jwt-decode';

const localAPI = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  getTokenData() {
    const token = localStorage.getItem('token');
    let tokenDecoded = null;

    if (token) {
      tokenDecoded = jwtDecode(token);
    }
    return tokenDecoded;
  },
  deleteToken: () => localStorage.removeItem('token'),
};

export default localAPI;
