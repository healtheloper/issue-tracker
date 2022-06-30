import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import IconTextBox from '@components/data-display/IconTextBox';
import Container from '@components/layout/Container';
import AlertDialog from '@components/util/AlertDialog';
import { useIssueContext } from '@contexts/IssueProvider';
import SideMenu from '@pages/common/organisms/SideMenu';

enum MenuTypeEnum {
  ASSIGNEE = 'assignees',
  LABEL = 'labels',
  MILESTONE = 'milestone',
}

enum MenuKey {
  assignees = 'assignees',
  labels = 'labels',
  milestone = 'milestoneId',
}

export default function SideMenuSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    issue: { id, assignees = [], labels = [], milestone } = {},
    refetch: issueAxiosRefetch,
  } = useIssueContext();
  const menuState = { assignees, labels, milestone };

  const handleClickDeleteButton = () => {
    axios.delete(`/api/issues/${id}`);
    navigate('/');
  };

  const handleClickSideMenu = async (menu) => {
    const menuType = MenuTypeEnum[menu.type];
    const requestBody = {};
    const requestKey = MenuKey[menuType];
    const requestValue = getMenuValue(menuType, menuState, menu);
    requestBody[requestKey] = requestValue;
    await axios.patch(`/api/issues/${id}/${menuType}`, requestBody);
    issueAxiosRefetch();
  };

  return (
    <Container flexInfo={{ direction: 'column', align: 'flex-end' }} gap={0.75}>
      <SideMenu menuState={menuState} onClickAddBtn={handleClickSideMenu} />
      <Container mr="2rem">
        <AlertDialog
          sx={{
            backgroundColor: theme.palette.bgColor,
            color: theme.palette.fontColor,
          }}
          onClickYes={handleClickDeleteButton}
        >
          <IconTextBox
            Icon={<DeleteForeverOutlinedIcon />}
            texts={['이슈 삭제']}
            color={theme.palette.warning}
          />
        </AlertDialog>
      </Container>
    </Container>
  );
}

const getMenuValue = (menuType, menuState, menu) => {
  switch (menuType) {
    case 'assignees':
    case 'labels': {
      const newIds = menuState[menuType].map((type) => type.id);
      if (newIds.includes(menu.id)) {
        return newIds.filter((id) => id !== menu.id);
      }
      return [...newIds, menu.id];
    }
    case 'milestone': {
      if (menuState.milestone?.id === menu.id) {
        return null;
      }
      return menu.id;
    }
    default:
      throw Error('Unexpected Menu Type on useSideMenuPatch');
  }
};
