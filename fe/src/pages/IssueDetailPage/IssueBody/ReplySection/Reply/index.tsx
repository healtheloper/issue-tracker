import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Markdown from 'marked-react';
import { useState } from 'react';
import styled from 'styled-components';

import IconTextBox from '@components/data-display/IconTextBox';
import UserIcon from '@components/data-display/UserIcon';
import Container from '@components/layout/Container';
import { fontSize } from '@constants/fonts';
import { useHeaderState } from '@contexts/HeaderProvider';
import ReplyWritingArea from '@pages/IssueDetailPage/IssueBody/ReplySection/ReplyWritingArea';
import mixin from '@style/mixin';
import { ReplyType } from '@type/types';
import { calTimePassed } from '@util/dateHandler';
import lowlightRenderer from '@util/lowlightRenderer';

interface IReplyProps {
  replyData: ReplyType;
}

export default function Reply({ replyData }: IReplyProps) {
  const { userInfo } = useHeaderState();
  const [isEditingReply, setIsEditingReply] = useState(false);
  const isMyReply = () => replyData.writer === userInfo?.identity;

  return isEditingReply ? (
    <ReplyWritingArea
      type="EDIT"
      originalData={replyData}
      finishEdit={() => setIsEditingReply(false)}
    />
  ) : (
    <Container flexInfo={{}} gap={1}>
      <UserIcon size="BIG" imgUrl={replyData.profileUrl} />
      <ReplyContainer>
        <ReplyHeader>
          <Container>
            <Writer>{replyData.writer}</Writer>
            <CreatedTime>
              {`${calTimePassed(new Date(replyData.createdDateTime))} 전`}
            </CreatedTime>
          </Container>
          {isMyReply() && (
            <Container flexInfo={{ align: 'center' }} gap={1.5}>
              <WriterBadge>작성자</WriterBadge>
              <IconTextBox
                Icon={<ModeEditOutlinedIcon fontSize="small" />}
                texts={['편집']}
                onClick={() => setIsEditingReply(true)}
              />
              <SentimentSatisfiedAltIcon fontSize="small" />
            </Container>
          )}
        </ReplyHeader>
        <ReplyBody>
          <article className="markdown-body">
            <Markdown value={replyData.comment} renderer={lowlightRenderer} />
          </article>
        </ReplyBody>
      </ReplyContainer>
    </Container>
  );
}

const ReplyContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const ReplyHeader = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  height: 4rem;
  padding: 0 2rem 0 1.5rem;
  background-color: ${({ theme }) => theme.palette.darkerBgColor};
  border-radius: 1rem 1rem 0 0;
`;

const ReplyBody = styled.div`
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
