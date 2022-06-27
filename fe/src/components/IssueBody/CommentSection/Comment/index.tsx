import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import styled from 'styled-components';

import Container from '@components/Container';
import IconTextBox from '@components/IconTextBox';
import { fontSize } from '@constants/fonts';
import { useHeaderState } from '@contexts/HeaderProvider';
import mixin from '@style/mixin';
import { CommentType } from '@type/types';
import { calTimePassed } from '@util/dateHandler';

interface ICommentProps {
  commentData: CommentType;
}

export default function Comment({ commentData }: ICommentProps) {
  const headerState = useHeaderState();
  const isMyComment = () =>
    commentData.writerIdentity === headerState.userInfo?.identity;
  return (
    <CommentContainer>
      <CommentHeader>
        <Container>
          <Writer>{commentData.writerIdentity}</Writer>
          <CreatedTime>
            {`${calTimePassed(new Date(commentData.createdDateTime))} 전`}
          </CreatedTime>
        </Container>
        {isMyComment() && (
          <Container flexInfo={{ align: 'center' }} gap={1.5}>
            <WriterBadge>작성자</WriterBadge>
            <IconTextBox
              Icon={<ModeEditOutlinedIcon fontSize="small" />}
              texts={['편집']}
            />
            <SentimentSatisfiedAltIcon fontSize="small" />
          </Container>
        )}
      </CommentHeader>
      <CommentBody>
        <div>{commentData.content}</div>
      </CommentBody>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 1rem;
  margin-bottom: 1.5rem;
`;

const CommentHeader = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  height: 4rem;
  padding: 0 2rem 0 1.5rem;
  background-color: ${({ theme }) => theme.palette.darkerBgColor};
  border-radius: 1rem 1rem 0 0;
`;

const CommentBody = styled.div`
  padding: 1rem;
  border-radius: 0 0 1rem 1rem;
`;

const Writer = styled.span`
  margin-right: 1rem;
`;

const CreatedTime = styled.span`
  color: ${({ theme }) => theme.palette.placeholder};
`;

const WriterBadge = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'center' })}
  width: 4rem;
  height: 1.5rem;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 2rem;
  font-size: ${fontSize.xsmall};
`;
