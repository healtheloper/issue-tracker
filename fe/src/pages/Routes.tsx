import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import { useHeaderState } from '@contexts/HeaderProvider';
import CreateIssuePage from '@pages/CreateIssuePage';
import DefaultPage from '@pages/DefaultPage';
import IssueDetailPage from '@pages/IssueDetailPage';
import JoinPage from '@pages/JoinPage';
import LabelMilestoneLayout from '@pages/LabelMilestoneLayout';
import LabelPage from '@pages/LabelPage';
import Layout from '@pages/Layout';
import LoginPage from '@pages/LoginPage';
import MilestonePage from '@pages/MilestonePage';
import OauthCallbackPage from '@pages/OauthCallbackPage';

export default function Routes() {
  const { isLogin } = useHeaderState();
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={isLogin ? <DefaultPage /> : <Navigate to="/login" />}
        />
        <Route path="createIssue" element={<CreateIssuePage />} />
        <Route path="detail/:id" element={<IssueDetailPage />} />
        <Route path="list" element={<LabelMilestoneLayout />}>
          <Route path="label" element={<LabelPage />} />
          <Route path="milestone" element={<MilestonePage />} />
        </Route>
        <Route path="callback" element={<OauthCallbackPage />} />
      </Route>
    </RouterRoutes>
  );
}
