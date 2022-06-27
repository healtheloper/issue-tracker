import axios from 'axios';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';

import CommentSection from '@components/IssueBody/CommentSection';
import SideMenu from '@components/SideMenu';
import UserIcon from '@components/UserIcon';
import { useIssueState } from '@contexts/IssueProvider';
import sideMenuReducer from '@util/sideMenuReducer';

export default function IssueBody() {
  const { id, assignees, labels, milestone, profileUrl } = useIssueState();
  const initState = { assignees, labels, milestone };
  const [menuState, menuDispatch] = useReducer(sideMenuReducer, initState);

  useEffect(() => {
    (async () => {
      await axios.patch('/api/issue/update', {
        id,
        assignees: menuState.assignees,
        labels: menuState.labels,
        milestone: menuState.milestone,
      });
    })();
  }, [menuState]);

  return (
    <IssueBodyGrid>
      <UserIcon size="BIG" imgUrl={profileUrl} />
      <CommentSection />
      <SideMenu menuState={menuState} menuDispatch={menuDispatch} />
    </IssueBodyGrid>
  );
}

const IssueBodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 15fr 5fr;
  grid-gap: 1rem;
`;
