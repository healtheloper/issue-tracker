import { Checkbox } from '@mui/material';
import styled from 'styled-components';

import UserIcon from '@components/data-display/UserIcon';
import colors from '@constants/colors';
import IssueDescription from '@pages/DefaultPage/IssueTable/IssueTableBody/IssueTableCell/IssueDescription';
import IssueTitle from '@pages/DefaultPage/IssueTable/IssueTableBody/IssueTableCell/IssueTitle';
import mixin from '@style/mixin';
import { IssueType } from '@type/types';

interface IIssueTableCell {
  issue: IssueType;
  isIssueChecked: boolean;
  toggleIssueCheck: () => void;
}

export default function IssueTableCell({
  issue,
  isIssueChecked,
  toggleIssueCheck,
}: IIssueTableCell) {
  return (
    <CellContainer>
      <CheckboxContainer>
        <Checkbox
          sx={{ color: colors.grey }}
          checked={isIssueChecked}
          onClick={toggleIssueCheck}
        />
      </CheckboxContainer>
      <IssueInfoContainer>
        <IssueTitle
          title={issue.subject}
          labels={issue.labels}
          issueId={issue.id}
        />
        <IssueDescription
          issueNum={issue.id}
          writer={issue.writer}
          createdDateTime={issue.createdDateTime}
          milestone={issue.milestone}
        />
      </IssueInfoContainer>
      <AssigneeIconContainer>
        {issue.assignees.map((assignee) => (
          <UserIcon
            key={assignee.id}
            size="SMALL"
            imgUrl={assignee.profileUrl}
          />
        ))}
      </AssigneeIconContainer>
    </CellContainer>
  );
}

const CellContainer = styled.div`
  position: relative;
  height: 6.25rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  background-color: ${({ theme }) => theme.palette.contentColor};
  :hover {
    background-color: ${({ theme }) => theme.palette.lighterBgColor};
  }
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1.5rem;
`;

const IssueInfoContainer = styled.div`
  ${mixin.flexMixin({ direction: 'column', justify: 'center' })}
  position: absolute;
  top: 1rem;
  left: 5rem;
  gap: 0.5rem;
`;

const AssigneeIconContainer = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  ${mixin.flexMixin({ align: 'center' })};
`;
