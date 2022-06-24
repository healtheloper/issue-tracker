import styled from 'styled-components';

import LabelTableCell from '@components/LabelTable/LabelTableBody/LabelTableCell';
import mixin from '@style/mixin';

export default function LabelTableBody({ labels }) {
  return (
    <LabelTableBodyContainer>
      {labels?.length ? (
        labels.map((label) => <LabelTableCell key={label.id} label={label} />)
      ) : (
        <NoIssueMessage>검색과 일치하는 결과가 없습니다.</NoIssueMessage>
      )}
    </LabelTableBodyContainer>
  );
}

const LabelTableBodyContainer = styled.div`
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
