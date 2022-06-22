import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Checkbox } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Container from '@components/Container';
import IconTextBox from '@components/IconTextBox';
import OpenAndCloseFilter from '@components/IssueTable/IssueTableHeader/OpenAndCloseFilter';
import PopoverContainer from '@components/PopoverContainer';
import colors from '@constants/colors';
import modalStatic, { ModalIssueType } from '@constants/modalStatic';
import useAxiosAll from '@hooks/useAxiosAll';
import mixin from '@style/mixin';
import { ModalContentType } from '@type/types';
import { checkIfUrlHasQuery, makeUrlQuery } from '@util/queryParser';

interface IIssueTableHeaderProps {
  clickedStatusCnt: number;
  oppositeStatusCnt: number;
  toggleAllIssues: (isChecked: boolean) => void;
  checkedIssueIndices: boolean[];
}

const headerItems = [
  {
    type: 'ASSIGNEE',
    title: '담당자',
  },
  {
    type: 'LABEL',
    title: '레이블',
  },
  {
    type: 'MILESTONE',
    title: '마일스톤',
  },
  {
    type: 'WRITER',
    title: '작성자',
  },
];

export default function IssueTableHeader({
  clickedStatusCnt,
  oppositeStatusCnt,
  toggleAllIssues,
  checkedIssueIndices,
}: IIssueTableHeaderProps) {
  const navigate = useNavigate();
  const { data: menuDatas } = useAxiosAll<ModalContentType[]>(
    ['/api/members', '/api/labels', '/api/milestones', '/api/members'],
    'get',
  );

  if (!menuDatas) return <div />;
  const headerDatas = headerItems?.map((headerItem, idx) => ({
    ...headerItem,
    menus: menuDatas[idx],
  }));

  const isAllIssueChecked =
    checkedIssueIndices.length !== 0 &&
    checkedIssueIndices.every((isChecked) => isChecked);

  const isAnyIssueChecked = checkedIssueIndices.some((isChecked) => isChecked);

  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
    toggleAllIssues(e.target.checked);
  };

  const handleClickTableHeaderItem = ({ queryKey, queryValue }) => {
    const isSelectedFilter = checkIfUrlHasQuery(queryKey, queryValue);
    const queryString = isSelectedFilter
      ? makeUrlQuery('delete', queryKey)
      : makeUrlQuery('set', queryKey, queryValue);
    navigate(`/?${queryString}`);
  };

  return (
    <IssueTableHeaderContainer>
      <Container flexInfo={{ align: 'center' }}>
        <Checkbox
          checked={isAllIssueChecked}
          sx={{ color: colors.grey }}
          onChange={handleCheckboxClick}
        />
        <OpenAndCloseFilter
          clickedStatusCnt={clickedStatusCnt}
          oppositeStatusCnt={oppositeStatusCnt}
        />
      </Container>
      <Container
        gap={2}
        flexInfo={{ align: 'center', justify: 'space-around' }}
      >
        {isAnyIssueChecked ? (
          <PopoverContainer<ModalIssueType>
            title="상태수정"
            menus={modalStatic.STATUS_CHANGE}
          >
            <IconTextBox
              Icon={<KeyboardArrowDownIcon />}
              texts={['상태수정']}
              isIconAfterText
            />
          </PopoverContainer>
        ) : (
          headerDatas?.map(({ title, type, menus }) => (
            <PopoverContainer<ModalContentType>
              key={type}
              title={title}
              menus={getNewMenus(menus, type)}
              onClickModalItem={handleClickTableHeaderItem}
            >
              <IconTextBox
                Icon={<KeyboardArrowDownIcon />}
                texts={[title]}
                isIconAfterText
              />
            </PopoverContainer>
          ))
        )}
      </Container>
    </IssueTableHeaderContainer>
  );
}

const IssueTableHeaderContainer = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  height: 4rem;
  padding: 0 2rem 0 1.5rem;
  background-color: ${({ theme }) => theme.palette.lighterBgColor};
  border-radius: 1rem 1rem 0 0;
`;

function getNewMenus(menus, type) {
  switch (type) {
    case 'ASSIGNEE':
      return menus.map((menu) => ({
        ...menu,
        name: menu.identity,
        queryKey: 'assignee',
        queryValue: menu.identity,
      }));
    case 'WRITER':
      return menus.map((menu) => ({
        ...menu,
        name: menu.identity,
        queryKey: 'writer',
        queryValue: menu.identity,
      }));
    case 'LABEL':
      return menus.map((menu) => ({
        ...menu,
        queryKey: 'label',
        queryValue: menu.id,
      }));
    case 'MILESTONE':
      return menus.map((menu) => ({
        ...menu,
        name: menu.subject,
        queryKey: 'milestone',
        queryValue: menu.id,
      }));
    default:
      throw Error('get menus something wrong');
  }
}
