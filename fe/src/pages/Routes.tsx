import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { useHeaderState } from '@contexts/HeaderProvider';
import CreateIssuePage from '@pages/CreateIssuePage';
import DefaultPage from '@pages/DefaultPage';
import JoinPage from '@pages/JoinPage';
import Layout from '@pages/Layout';
import LoginPage from '@pages/LoginPage';
import OauthCallbackPage from '@pages/OauthCallbackPage';

export default function Routes() {
  const { isLogin } = useHeaderState();
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={isLogin ? <DefaultPage /> : <LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="createIssue" element={<CreateIssuePage />} />
        <Route path="callback" element={<OauthCallbackPage />} />
      </Route>
    </RouterRoutes>
  );
}
