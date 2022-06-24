import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useHeaderDispatch } from '@contexts/HeaderProvider';

export default function OauthCallbackPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const headerDispatch = useHeaderDispatch();
  const code = searchParams.get('code');
  const serverBaseUrl = process.env.SERVER;
  const loginUrl = `${serverBaseUrl}/api/login?code=${code}`;

  const refreshCachedAccessToken = async () => {
    const res = await axios.post(`${serverBaseUrl}/api/access-token/reissue`);
    const newAccessToken = res.headers['access-token'];
    headerDispatch({ type: 'REFRESH_TOKEN', accessToken: newAccessToken });
  };

  const setRefreshInterval = () => {
    const intervalTime = Number(process.env.TOKEN_REFRESH_INTERVAL) ?? 50000;
    setInterval(refreshCachedAccessToken, intervalTime);
  };

  const logOut = () => {
    headerDispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      const jwtResponse = await axios.get(loginUrl);
      const accessToken = jwtResponse.headers['access-token'];
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      axios.defaults.headers.common.cookies = document.cookie;

      // local환경에서 set cookie가 되지 않아서 임시로 사용하는 로직.
      const refreshToken = jwtResponse.headers['refresh-token'];
      document.cookie = `refresh-token=${refreshToken}`;

      const { data: userInfo } = await axios.get(`${serverBaseUrl}/api/mine`);
      headerDispatch({ type: 'LOGIN', userInfo, accessToken });
      // setRefreshInterval();
      navigate('/');
    })();
  }, [loginUrl]);

  return <LoadingSpinner size="5rem" />;
}

const LoadingSpinner = styled(CircularProgress)`
  position: fixed;
  top: calc(50vh - 2.5rem);
  left: calc(50vw - 2.5rem);
`;
