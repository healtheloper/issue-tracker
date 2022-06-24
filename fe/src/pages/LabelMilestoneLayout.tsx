import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/Button';
import TagTab from '@components/UtilBar/TagTab';
import mixin from '@style/mixin';

export type OutletContext = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const Body = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export default function LabelMilestoneLayout() {
  const location = useLocation();
  const activeTab = location.pathname.includes('label') ? 'label' : 'milestone';
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Body>
      <Nav>
        <TagTab activeTab={activeTab} />
        {isAdding ? (
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setIsAdding(false);
            }}
          >
            <CancelOutlinedIcon />
            <span>취소</span>
          </Button>
        ) : (
          <Button
            size="small"
            variant="primary"
            onClick={() => {
              setIsAdding(true);
            }}
          >
            <AddIcon />
            <span>추가</span>
          </Button>
        )}
      </Nav>
      <Outlet context={[isAdding, setIsAdding]} />
    </Body>
  );
}

const Nav = styled.nav`
  ${mixin.flexMixin({ justify: 'space-between' })}
`;
