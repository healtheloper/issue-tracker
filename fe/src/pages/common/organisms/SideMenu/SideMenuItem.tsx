import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import styled from 'styled-components';

import Container from '@components/layout/Container';
import PopoverContainer from '@components/util/PopoverContainer';
import Assignees from '@pages/common/organisms/SideMenu/Assignees';
import Labels from '@pages/common/organisms/SideMenu/Labels';
import Milestone from '@pages/common/organisms/SideMenu/Milestone';
import {
  MenuDispatchType,
  ModalTypes,
} from '@pages/common/organisms/SideMenu/type';
import { LabelType, MemberType, MilestoneType } from '@type/types';

enum KoType {
  ASSIGNEE = '담당자',
  LABEL = '레이블',
  MILESTONE = '마일스톤',
}

const getSubBoxByType = (type, state) => {
  switch (type) {
    case 'ASSIGNEE':
      return <Assignees assignees={state} />;
    case 'LABEL':
      return <Labels labels={state} />;
    case 'MILESTONE':
      return <Milestone milestone={state} />;
    default:
      throw Error("Side Menu item's subbox is something wrong");
  }
};

export default function SideMenuItem({
  type,
  state,
  menus,
  onClickAddBtn,
}): React.ReactElement<{
  type: ModalTypes;
  state: MemberType[] | LabelType[] | MilestoneType;
  menuDispatch: MenuDispatchType;
}> {
  const title = `${KoType[type]} 추가`;

  return (
    <Container padding="2.5rem 2rem">
      <Container
        position="relative"
        flexInfo={{ align: 'center', justify: 'space-between' }}
        mb="1rem"
      >
        <TypeTitle>{KoType[type]}</TypeTitle>
        <PopoverContainer
          left={-14}
          top={2}
          title={title}
          menus={getFormattedMenus(menus, type)}
          onClickPopoverItem={onClickAddBtn}
        >
          <AddIcon sx={{ cursor: 'pointer' }} />
        </PopoverContainer>
      </Container>
      {state && getSubBoxByType(type, state)}
    </Container>
  );
}

const TypeTitle = styled.h6``;

function getFormattedMenus(menus, type) {
  switch (type) {
    case 'ASSIGNEE':
      return menus?.map((menu) => ({
        ...menu,
        type: 'ASSIGNEE',
        name: menu.identity,
      }));
    case 'MILESTONE':
      return menus?.map((menu) => ({
        ...menu,
        type: 'MILESTONE',
        name: menu.subject,
      }));
    case 'LABEL':
      return menus?.map((menu) => ({
        ...menu,
        type: 'LABEL',
      }));
    default:
      return menus;
  }
}
