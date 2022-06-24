import styled from 'styled-components';

import IssueTable from '@components/IssueTable';
import UtilBar from '@components/UtilBar';

const Body = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export default function DefaultPage() {
  return (
    <Body>
      <UtilBar />
      <IssueTable />
    </Body>
  );
}
