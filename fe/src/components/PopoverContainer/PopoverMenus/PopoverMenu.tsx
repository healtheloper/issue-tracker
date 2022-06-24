import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import styled from 'styled-components';

import mixin from '@style/mixin';
import { checkIfUrlHasQuery } from '@util/queryParser';

export default function PopoverMenu({ menu, onClickPopoverItem }) {
  const isSelectedFilter = checkIfUrlHasQuery(menu.queryKey, menu.queryValue);
  return (
    <PopoverMenuContainer
      onClick={() => {
        onClickPopoverItem(menu);
      }}
    >
      <span>{menu.name}</span>
      {isSelectedFilter ? (
        <CheckCircleOutlineIcon />
      ) : (
        <RadioButtonUncheckedIcon />
      )}
    </PopoverMenuContainer>
  );
}

const PopoverMenuContainer = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  width: 100%;
  height: 2.75rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  background: ${({ theme }) => theme.palette.contentColor};
  padding: 0 1rem;
`;
