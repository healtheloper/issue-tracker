import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { RefObject } from 'react';
import styled, { useTheme } from 'styled-components';

import Container from '@components/Container';
import IconTextBox from '@components/IconTextBox';
import Squircle from '@components/Squircle';
import { fontSize } from '@constants/fonts';
import { useIssueState } from '@contexts/IssueProvider';
import mixin from '@style/mixin';
import { calTimePassed } from '@util/dateHandler';

interface IIssueInfo {
  isTitleEditing: boolean;
  titleRef: RefObject<HTMLInputElement>;
}

export default function IssueInfo({ isTitleEditing, titleRef }: IIssueInfo) {
  const { subject, id, writer, comments, createdDateTime, status } =
    useIssueState();
  const theme = useTheme();

  return (
    <Container>
      <Container flexInfo={{ align: 'center' }} gap={1}>
        {isTitleEditing ? (
          <input ref={titleRef} placeholder="제목" />
        ) : (
          <>
            <IssueTitle>{subject}</IssueTitle>
            <IssueNumber>{`#${id}`}</IssueNumber>
          </>
        )}
      </Container>
      <Container flexInfo={{ align: 'center' }} gap={0.5} mt="1.25rem">
        {status === 'OPEN' ? (
          <IssueStatusBadge
            color={theme.palette.primary}
            backgroundColor={theme.palette.primaryBgColor}
            borderLineColor={theme.palette.primary}
            width={6.25}
            height={2.5}
          >
            <IconTextBox
              Icon={<ErrorOutlineIcon fontSize="small" />}
              texts={['열린 이슈']}
              spacing={0.375}
              fontSize={0.625}
            />
          </IssueStatusBadge>
        ) : (
          <IssueStatusBadge
            color={theme.palette.default}
            backgroundColor={theme.palette.warning}
            borderLineColor={theme.palette.default}
            width={6.25}
            height={2.5}
          >
            <IconTextBox
              Icon={<ErrorOutlineIcon fontSize="small" />}
              texts={['닫힌 이슈']}
              spacing={0.375}
              fontSize={0.625}
            />
          </IssueStatusBadge>
        )}
        <IconTextBox
          texts={[
            `이 이슈가 ${calTimePassed(
              new Date(createdDateTime),
            )} 전에 ${writer}님에 의해 열렸습니다`,
            '·',
            `코멘트 ${comments.length}개`,
          ]}
          spacing={0.5}
          color={theme.palette.placeholder}
          fontSize={1.125}
        />
      </Container>
    </Container>
  );
}

const IssueTitle = styled.h1`
  font-size: ${fontSize.large};
`;

const IssueNumber = styled.span`
  font-size: ${fontSize.large};
  color: ${({ theme }) => theme.palette.placeholder};
`;

const IssueStatusBadge = styled(Squircle)`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
`;
