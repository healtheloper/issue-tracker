import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import IconTextBox from '@components/IconTextBox';
import PopoverContainer from '@components/PopoverContainer';
import modalStatic from '@constants/modalStatic';
import mixin from '@style/mixin';
import { checkIfUrlHasQuery, makeUrlQuery } from '@util/queryParser';

export default function FilterBarSelectMenu() {
  const navigate = useNavigate();

  const handleClickTableHeaderItem = ({ queryKey, queryValue }) => {
    const isSelectedFilter = checkIfUrlHasQuery(queryKey, queryValue);
    const queryString = isSelectedFilter
      ? makeUrlQuery('delete', queryKey)
      : makeUrlQuery('set', queryKey, queryValue);
    navigate(`/?${queryString}`);
  };

  return (
    <SelectMenuContainer>
      <PopoverContainer
        title="필터"
        menus={modalStatic.ISSUE}
        onClickPopoverItem={handleClickTableHeaderItem}
      >
        <IconTextBox
          Icon={<KeyboardArrowDownIcon />}
          texts={['필터']}
          isIconAfterText
        />
      </PopoverContainer>
    </SelectMenuContainer>
  );
}

const SelectMenuContainer = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'center' })};
  width: 8rem;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.bgColor};
  border-radius: 0.75rem 0 0 0.75rem;
`;
