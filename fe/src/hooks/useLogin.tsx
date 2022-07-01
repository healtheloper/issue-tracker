import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useLogin() {
  const [userInfo, setUserInfo] = useState(null);

  let refreshIntervalId: NodeJS.Timer;

  const setAccessTokenOnHeader = (accessToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const setRefreshInterval = () => {
    const intervalTime = Number(process.env.TOKEN_REFRESH_INTERVAL) ?? 50000;
    refreshIntervalId = setInterval(() => {
      reissueAccessToken().catch(() => {
        logOut();
        clearInterval(refreshIntervalId);
      });
    }, intervalTime);
  };

  const reissueAccessToken = async () => {
    try {
      const res = await axios.post('/api/access-token/reissue');
      const accessToken = res.headers['access-token'];
      setAccessTokenOnHeader(accessToken);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
      };
    }
  };

  // 역할: cookie reset
  const logOut = () => {
    // headerDispatch({ type: 'LOGOUT' });
    document.cookie = `refresh-token=expires. ${new Date().toISOString()}`;
    axios.defaults.headers.common.Authorization = '';
    setUserInfo(null);
    // navigate('/');
  };

  const getUserInfoByAccessToken = async () => {
    try {
      const { data } = await axios.get(`/api/mine`);
      // headerDispatch({ type: 'LOGIN', userInfo });
      setRefreshInterval();
      return {
        ok: true,
        data,
      };
      // navigate('/');
    } catch (error) {
      const { message } = error as Error;
      return {
        ok: false,
        message,
      };
    }
  };

  const login = async (loginUrl) => {
    try {
      const jwtResponse = await axios.get(loginUrl);
      const accessToken = jwtResponse.headers['access-token'];
      setAccessTokenOnHeader(accessToken);
      const { ok, data, message } = await getUserInfoByAccessToken();
      if (!ok) {
        throw Error(message);
      }
      setUserInfo(data);
      return {
        ok: true,
      };
    } catch (error) {
      const { message } = error as Error;
      return {
        ok: false,
        message,
      };
    }
  };

  const reLogin = async () => {
    try {
      await reissueAccessToken();
      const { ok, data, message } = await getUserInfoByAccessToken();
      if (!ok) {
        throw Error(message);
      }
      setUserInfo(data);
      return {
        ok: true,
      };
    } catch (error) {
      const { message } = error as Error;
      return {
        ok: false,
        message,
      };
    }
  };

  useEffect(() => {
    reLogin();
  }, []);

  return { userInfo, login, reLogin };
}
