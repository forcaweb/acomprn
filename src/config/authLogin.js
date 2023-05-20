import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const tokens = JSON.parse(localStorage.getItem('isLogged'));

export default function IsLogged() {
  if (tokens === null) window.location.href = '/';
  const getAuthToken = () => {
    const headers = { 'Content-Type': 'application/json' };
    axios({
      url: `${process.env.REACT_APP_API_URL}/islogged`,
      method: 'POST',
      data: { token: tokens.token },
      headers
    }).catch((err) => {
      localStorage.setItem('isLogged', null);
      if (err.response.status === 403) return false;
      return true;
    });
    return true;
  };
  return getAuthToken() ? <Outlet /> : <Navigate to="/" />;
}
