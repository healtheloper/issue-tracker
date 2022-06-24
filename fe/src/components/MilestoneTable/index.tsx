import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import MilestoneTableBody from '@components/MilestoneTable/MilestoneTableBody';
import MilestoneTableHeader from '@components/MilestoneTable/MilestoneTableHeader';
import useAxios from '@hooks/useAxios';
import { IssueType } from '@type/types';

type IssueTableDataType = {
  issues: IssueType[];
  countOfOpenIssues: number;
  countOfClosedIssues: number;
};

export default function MilestoneTable() {
  const fetchUrl = `/api/issues/${useLocation().search}`;
  const { data: issueTableData } = useAxios<IssueTableDataType>(fetchUrl);

  return issueTableData ? (
    <MilestoneTableContainer>
      <MilestoneTableHeader />
      <MilestoneTableBody />
    </MilestoneTableContainer>
  ) : null;
}

const MilestoneTableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 1rem;
  margin-top: 1.5rem;
`;
