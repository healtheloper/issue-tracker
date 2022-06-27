import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import IconTextBox from '@components/IconTextBox';
import Label from '@components/Label';
import mixin from '@style/mixin';
import { LabelType } from '@type/types';

export default function IssueTitle({
  title,
  labels,
  issueId,
}: {
  title: string;
  labels: LabelType[];
  issueId: number;
}) {
  const navigate = useNavigate();

  const handleClickIssueTitle = () => {
    navigate(`/detail/${issueId}`);
  };

  return (
    <IssueTitleContainer>
      <IconTextBox
        Icon={<ErrorIcon color="primary" fontSize="small" />}
        texts={[title]}
        spacing={0.75}
        onClick={handleClickIssueTitle}
      />
      <LabelContainer>
        {labels.map((label) => (
          <Label key={label.id} text={label.name} bgColor={label.color} />
        ))}
      </LabelContainer>
    </IssueTitleContainer>
  );
}

const IssueTitleContainer = styled.div`
  ${mixin.flexMixin({ align: 'center' })}
  height: 2rem;
`;

const LabelContainer = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  margin-left: 0.5rem;
  gap: 0.5rem;
`;
