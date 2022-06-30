import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import axios from 'axios';
import styled, { useTheme } from 'styled-components';

import IconTextBox from '@components/data-display/IconTextBox';
import AlertDialog from '@components/util/AlertDialog';
import { useMilestoneContext } from '@contexts/MilestoneProvider';

export default function ButtonBoxes({ milestoneId, toggleIsEditing }) {
  const theme = useTheme();
  const { refetch: milestonesRefetch } = useMilestoneContext();

  const handleClickCloseButton = async () => {
    await axios.patch(`/api/milestones/${milestoneId}/status`, {
      updatedStatus: 'CLOSED',
    });
    milestonesRefetch();
  };

  const handleClickEditButton = () => {
    toggleIsEditing();
  };

  const handleClickDeleteButton = async () => {
    await axios.delete(`/api/milestones/${milestoneId}`);
    milestonesRefetch();
  };

  return (
    <Wrapper>
      <button type="button" onClick={handleClickCloseButton}>
        <IconTextBox
          Icon={<Inventory2OutlinedIcon fontSize="small" />}
          texts={['닫기']}
          color={theme.palette.fontColor}
          spacing={0.2}
        />
      </button>
      <button type="button" onClick={handleClickEditButton}>
        <IconTextBox
          Icon={<EditIcon fontSize="small" />}
          texts={['편집']}
          color={theme.palette.fontColor}
          spacing={0.2}
        />
      </button>
      <AlertDialog
        sx={{
          backgroundColor: theme.palette.bgColor,
          color: theme.palette.fontColor,
        }}
        onClickYes={handleClickDeleteButton}
      >
        <IconTextBox
          Icon={<DeleteIcon fontSize="small" />}
          texts={['삭제']}
          color={theme.palette.warning}
          spacing={0.2}
        />
      </AlertDialog>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
`;
