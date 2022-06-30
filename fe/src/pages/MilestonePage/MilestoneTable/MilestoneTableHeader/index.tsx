import styled from 'styled-components';

import MilestoneStatusTabs from '@pages/MilestonePage/MilestoneTable/MilestoneTableHeader/MilestoneStatusTabs';
import mixin from '@style/mixin';

export default function MilestoneTableHeader() {
  return (
    <MilestoneTableHeaderContainer>
      <MilestoneStatusTabs />
    </MilestoneTableHeaderContainer>
  );
}

const MilestoneTableHeaderContainer = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  height: 4rem;
  padding: 0 2rem 0 1.5rem;
  background-color: ${({ theme }) => theme.palette.lighterBgColor};
  border-radius: 1rem 1rem 0 0;
`;
