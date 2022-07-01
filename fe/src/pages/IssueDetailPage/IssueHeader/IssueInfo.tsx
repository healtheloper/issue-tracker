import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { RefObject } from 'react';
import styled, { useTheme } from 'styled-components';

import IconTextBox from '@components/data-display/IconTextBox';
import InputBox from '@components/input/InputBox';
import Container from '@components/layout/Container';
import Squircle from '@components/layout/Squircle';
import { fontSize } from '@constants/fonts';
import { useIssueContext } from '@contexts/IssueProvider';
import mixin from '@style/mixin';
import { calTimePassed } from '@util/dateHandler';

interface IIssueInfo {
  isTitleEditing: boolean;
  titleRef: RefObject<HTMLInputElement>;
}

export default function IssueInfo({ isTitleEditing, titleRef }: IIssueInfo) {
  const {
    issue: {
      subject,
      id,
      writer,
      replies = [],
      createdDateTime = '',
      status,
    } = {},
  } = useIssueContext();
  const theme = useTheme();

  return id ? (
    <Container>
      <Container flexInfo={{ align: 'center' }} gap={1}>
        {isTitleEditing ? (
          <InputBox ref={titleRef} defaultValue={subject} />
        ) : (
          <IssueTitleWrapper>
            <IssueTitle>{subject}</IssueTitle>
            <IssueNumber>{`#${id}`}</IssueNumber>
          </IssueTitleWrapper>
        )}
      </Container>
      <Container flexInfo={{ align: 'center' }} gap={0.5} mt="1.25rem">
        {status === 'OPEN' ? (
          <IssueStatusBadge
            color={theme.palette.primary}
            backgroundColor={theme.palette.secondary}
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
            `코멘트 ${replies.length}개`,
          ]}
          spacing={0.5}
          color={theme.palette.placeholder}
          fontSize={1.125}
        />
      </Container>
    </Container>
  ) : (
    <div />
  );
}

const IssueTitleWrapper = styled.div`
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;
  height: 4rem;
`;
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
