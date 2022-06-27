import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useAxios from '@hooks/useAxios';
import { IssueType } from '@type/types';

import IssueTableBody from './IssueTableBody';
import IssueTableHeader from './IssueTableHeader';

type IssueTableDataType = {
  issues: IssueType[];
  countOfOpenIssues: number;
  countOfClosedIssues: number;
};

export default function IssueTable() {
  const [checkedIssueIds, setCheckedIssueIds] = useState<number[]>([]);
  const fetchUrl = `/api/issues/${useLocation().search}`;
  const { state: issueState } = useAxios<IssueTableDataType>(fetchUrl);
  const { data: issueTableData } = issueState;

  const toggleAllIssues = (isChecked: boolean) => {
    if (!issueTableData) return;
    const newState = isChecked
      ? issueTableData.issues.map((issue) => issue.id)
      : [];
    setCheckedIssueIds(newState);
  };

  const toggleOneIssue = (issueId: number) => {
    setCheckedIssueIds((prev) => {
      const newState = [...prev];
      if (!checkedIssueIds.includes(issueId)) {
        return [...newState, issueId];
      }
      return newState.filter((id) => id !== issueId);
    });
  };

  useEffect(() => {
    setCheckedIssueIds([]);
  }, [issueTableData]);

  return issueTableData ? (
    <IssueTableContainer>
      <IssueTableHeader
        issueTableData={issueTableData}
        checkedIssueIds={checkedIssueIds}
        toggleAllIssues={toggleAllIssues}
      />
      <IssueTableBody
        issues={issueTableData.issues}
        checkedIssueIds={checkedIssueIds}
        toggleOneIssue={toggleOneIssue}
      />
    </IssueTableContainer>
  ) : (
    <div />
  );
}

const IssueTableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 1rem;
  margin-top: 1.5rem;
`;
