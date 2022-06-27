import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import styled from 'styled-components';

import IconTextBox from '@components/IconTextBox';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { MilestoneType } from '@type/types';
import { calTimePassed } from '@util/dateHandler';

interface IIssueDescriptionProps {
  issueNum: number;
  writer: string;
  createdDateTime: string;
  milestone?: MilestoneType;
}

export default function IssueDescription({
  issueNum,
  writer,
  createdDateTime,
  milestone,
}: IIssueDescriptionProps) {
  const writerAndTimeDescription = `이 이슈가 ${calTimePassed(
    new Date(createdDateTime),
  )} 전, ${writer}님에 의해 작성되었습니다.`;

  return (
    <Wrapper>
      <IconTextBox color={colors.grey4} texts={[`#${issueNum}`]} />
      <IconTextBox color={colors.grey4} texts={[writerAndTimeDescription]} />
      {milestone && (
        <IconTextBox
          Icon={<SignpostOutlinedIcon fontSize="small" />}
          color={colors.grey4}
          texts={[milestone.subject]}
          spacing={0.5}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${mixin.flexMixin({ align: 'center' })}
  height: 1.75rem;
  gap: 1rem;
  color: ${colors.grey4};
`;
