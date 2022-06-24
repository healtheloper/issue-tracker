import styled from 'styled-components';

import MilestoneTableCell from '@components/MilestoneTable/MilestoneTableBody/MilestoneTableCell';
import mixin from '@style/mixin';

export default function MilestoneTableBody() {
  return (
    <MilestoneTableBodyContainer>
      <MilestoneTableCell />
      <MilestoneTableCell />
      {/* {true ? (
        new Array(2).map(() => <MilestoneTableCell />)
      ) : (
        <NoIssueMessage>검색과 일치하는 결과가 없습니다.</NoIssueMessage>
      )} */}
    </MilestoneTableBodyContainer>
  );
}

const MilestoneTableBodyContainer = styled.div`
  overflow: hidden;
  border-radius: 0 0 1rem 1rem;
`;

const NoIssueMessage = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'center' })}
  height: 6.25rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  background: ${({ theme }) => theme.palette.contentColor};
  color: ${({ theme }) => theme.palette.placeholder};
`;
