import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import styled, { useTheme } from 'styled-components';

import AlertDialog from '@components/AlertDialog';
import IconTextBox from '@components/IconTextBox';
import Label from '@components/Label';
import { useLabelContext } from '@contexts/LabelProvider';
import mixin from '@style/mixin';

export default function LabelTableCell({ label }) {
  const theme = useTheme();
  const { refetch: labelAxiosRefetch } = useLabelContext();

  const handleClickDeleteYes = async () => {
    await axios.delete(`/api/label/${label.id}`);
    labelAxiosRefetch();
  };

  return (
    <CellContainer>
      <LabelInfoContainer>
        <Label text={label.name} bgColor={label.color} />
        <LabelDescription>{label.description}</LabelDescription>
      </LabelInfoContainer>
      <AssigneeIconContainer>
        <button type="button">
          <IconTextBox
            Icon={<EditIcon fontSize="small" />}
            texts={['편집']}
            color={theme.palette.fontColor}
          />
        </button>
        <AlertDialog
          sx={{
            backgroundColor: theme.palette.bgColor,
            color: theme.palette.fontColor,
          }}
          onClickYes={handleClickDeleteYes}
        >
          <IconTextBox
            Icon={<DeleteIcon fontSize="small" />}
            texts={['삭제']}
            color={theme.palette.warning}
          />
        </AlertDialog>
      </AssigneeIconContainer>
    </CellContainer>
  );
}

const CellContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 0 2rem;
  height: 6.25rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
  background-color: ${({ theme }) => theme.palette.contentColor};
  :hover {
    background-color: ${({ theme }) => theme.palette.lighterBgColor};
  }
`;

const LabelInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 7fr;
  align-items: center;
`;

const LabelDescription = styled.span`
  opacity: 0.5;
`;

const AssigneeIconContainer = styled.div`
  ${mixin.flexMixin({ align: 'center' })};
  gap: 1rem;
`;
