import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import IconTextBox from '@components/data-display/IconTextBox';
import Container from '@components/layout/Container';
import PopoverContainer from '@components/util/PopoverContainer';
import colors from '@constants/colors';
import modalStatic, { ModalStatusChangeType } from '@constants/modalStatic';
import { useLabelContext } from '@contexts/LabelProvider';
import { useMemberContext } from '@contexts/MemberProvider';
import { useMilestoneContext } from '@contexts/MilestoneProvider';
import OpenAndCloseFilter from '@pages/DefaultPage/IssueTable/IssueTableHeader/OpenAndCloseFilter';
import mixin from '@style/mixin';
import { PopoverContentType, IssueType } from '@type/types';
import { checkIfUrlHasQuery, makeUrlQuery } from '@util/queryParser';

interface IIssueTableData {
  countOfOpenIssues: number;
  countOfClosedIssues: number;
  issues: IssueType[];
}

interface IIssueTableHeaderProps {
  issueTableData: IIssueTableData;
  checkedIssueIds: number[];
  toggleAllIssues: (isChecked: boolean) => void;
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
  issueTableData,
  checkedIssueIds,
  toggleAllIssues,
}: IIssueTableHeaderProps) {
  const navigate = useNavigate();
  const { members } = useMemberContext();
  const { labels } = useLabelContext();
  const { data: { milestones } = {} } = useMilestoneContext();

  const { countOfOpenIssues, countOfClosedIssues, issues } = issueTableData;

  const isAllIssueChecked =
    checkedIssueIds.length === issues.length && issues.length !== 0;

  const isAnyIssueChecked = checkedIssueIds.length >= 1;

  const getPopoverPositionLeft = (type) => {
    if (type === 'WRITER' || type === 'MILESTONE') {
      return '-10rem';
    }
    return '-2rem';
  };

  const filterDropdownDatas = headerItems.map((item) => {
    switch (item.type) {
      case 'ASSIGNEE':
      case 'WRITER':
        return {
          ...item,
          menus: members,
        };
      case 'MILESTONE':
        return {
          ...item,
          menus: milestones,
        };
      case 'LABEL':
        return {
          ...item,
          menus: labels,
        };
      default:
        throw Error('unexpected item type');
    }
  });

  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
    toggleAllIssues(e.target.checked);
  };

  const handleClickFilterItem = ({ queryKey, queryValue }) => {
    const isSelectedFilter = checkIfUrlHasQuery(queryKey, queryValue);
    const queryString = isSelectedFilter
      ? makeUrlQuery('delete', queryKey)
      : makeUrlQuery('set', queryKey, queryValue);
    navigate(`/?${queryString}`);
  };

  const handleClickStatusChangeItem = async ({ targetStatus }) => {
    await axios.patch('/api/issues/status', {
      updatedStatus: targetStatus,
      idOfIssues: checkedIssueIds,
    });
    navigate(0);
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
          countOfOpenIssues={countOfOpenIssues}
          countOfClosedIssues={countOfClosedIssues}
        />
      </Container>
      <Container
        gap={2}
        flexInfo={{ align: 'center', justify: 'space-around' }}
      >
        {isAnyIssueChecked ? (
          <PopoverContainer<ModalStatusChangeType>
            title="상태수정"
            menus={modalStatic.STATUS_CHANGE}
            onClickPopoverItem={handleClickStatusChangeItem}
          >
            <IconTextBox
              Icon={<KeyboardArrowDownIcon />}
              texts={['상태수정']}
              isIconAfterText
            />
          </PopoverContainer>
        ) : (
          filterDropdownDatas?.map(({ title, type, menus }) => (
            <PopoverContainer<PopoverContentType>
              key={type}
              title={title}
              left={getPopoverPositionLeft(type)}
              menus={getFormattedMenus(type, menus)}
              onClickPopoverItem={handleClickFilterItem}
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

function getFormattedMenus(type, menus) {
  switch (type) {
    case 'ASSIGNEE':
      return menus?.map((menu) => ({
        ...menu,
        name: menu.identity,
        queryKey: 'assignee',
        queryValue: menu.identity,
      }));
    case 'WRITER':
      return menus?.map((menu) => ({
        ...menu,
        name: menu.identity,
        queryKey: 'writer',
        queryValue: menu.identity,
      }));
    case 'LABEL':
      return menus?.map((menu) => ({
        ...menu,
        queryKey: 'labels',
        queryValue: menu.name,
      }));
    case 'MILESTONE':
      return menus?.map((menu) => ({
        ...menu,
        name: menu.subject,
        queryKey: 'milestone',
        queryValue: menu.subject,
      }));
    default:
      throw Error('get menus something wrong');
  }
}
