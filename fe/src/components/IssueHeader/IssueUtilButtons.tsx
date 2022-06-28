import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import axios from 'axios';
import { SetStateAction, Dispatch, RefObject } from 'react';
import styled, { useTheme } from 'styled-components';

import Button from '@components/Button';
import Container from '@components/Container';
import IconTextBox from '@components/IconTextBox';
import { useIssueContext } from '@contexts/IssueProvider';

interface IIssueUtilButtonsProps {
  titleRef: RefObject<HTMLInputElement>;
  isTitleEditing: boolean;
  setIsTitleEditing: Dispatch<SetStateAction<boolean>>;
}

export default function IssueUtilButtons({
  titleRef,
  isTitleEditing,
  setIsTitleEditing,
}: IIssueUtilButtonsProps) {
  const { issue: { id, status } = {}, refetch: issueAxiosRefetch } =
    useIssueContext();
  const theme = useTheme();

  const handleClickFinshEditButton = async () => {
    const newTitle = titleRef.current?.value;
    if (!newTitle || newTitle.length === 0) return;
    await axios.patch(`/api/issues/${id}/subject/update`, {
      subject: newTitle,
    });
    setIsTitleEditing(false);
    issueAxiosRefetch();
  };

  const handleClickToggleIssuStatusButton = async () => {
    await axios.patch('/api/issues/status/update', {
      updatedStatus: status === 'OPEN' ? 'CLOSED' : 'OPEN',
      idOfIssues: [id],
    });
    issueAxiosRefetch();
  };
  return (
    <Container gap={0.5} flexInfo={{ align: 'center' }}>
      <Button width={7.5} height={2.5} variant="outlined">
        {isTitleEditing ? (
          <ButtonContent
            Icon={<CloseOutlinedIcon fontSize="small" />}
            texts={['편집 취소']}
            fontSize={0.75}
            color={theme.palette.primary}
            onClick={() => setIsTitleEditing(false)}
          />
        ) : (
          <ButtonContent
            Icon={<ModeEditOutlinedIcon fontSize="small" />}
            texts={['제목 편집']}
            fontSize={0.75}
            color={theme.palette.primary}
            onClick={() => setIsTitleEditing(true)}
          />
        )}
      </Button>
      <Button
        width={7.5}
        height={2.5}
        variant={isTitleEditing ? 'primary' : 'outlined'}
      >
        {isTitleEditing ? (
          <ButtonContent
            Icon={<ModeEditOutlinedIcon fontSize="small" />}
            texts={['편집 완료']}
            fontSize={0.75}
            color={theme.palette.default}
            onClick={handleClickFinshEditButton}
          />
        ) : (
          <ButtonContent
            Icon={<Inventory2OutlinedIcon fontSize="small" />}
            texts={status === 'OPEN' ? ['이슈 닫기'] : ['이슈 열기']}
            fontSize={0.75}
            color={theme.palette.primary}
            onClick={handleClickToggleIssuStatusButton}
          />
        )}
      </Button>
    </Container>
  );
}

const ButtonContent = styled(IconTextBox)`
  margin: 0 auto;
`;
