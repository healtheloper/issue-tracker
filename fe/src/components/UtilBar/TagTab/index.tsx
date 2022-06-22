import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Divider from '@components/Divider';
import IconTextBox from '@components/IconTextBox';
import useAxios from '@hooks/useAxios';
import mixin from '@style/mixin';

type MilestoneDataType = {
  id: number;
  subject: string;
  description: string;
};

type MilestoneAPIResponseType = {
  milestones: MilestoneDataType[];
};

type LabelDataType = {
  id: number;
  name: string;
  description: string;
  color: string;
};

type LabelAPIResponseType = {
  labels: LabelDataType[];
};

export default function TagTab() {
  const serverDomain = process.env.SERVER;
  const milestoneURL = `${serverDomain}/api/milestones`;
  const labelURL = `${serverDomain}/api/labels`;
  const { data: milestoneData } =
    useAxios<MilestoneAPIResponseType>(milestoneURL);
  const { data: labelData } = useAxios<LabelAPIResponseType>(labelURL);

  return (
    milestoneData && (
      <Wrapper>
        <Link to="/list/label">
          <IconTextBox
            Icon={<LocalOfferOutlinedIcon />}
            texts={['레이블', `(${labelData?.labels.length})`]}
            spacing={0.625}
          />
        </Link>
        <Divider isVertical length="100%" margin="0" />
        <Link to="/list/milestone">
          <IconTextBox
            Icon={<SignpostOutlinedIcon />}
            texts={['마일스톤', `(${milestoneData?.milestones.length})`]}
            spacing={0.625}
          />
        </Link>
      </Wrapper>
    )
  );
}

const Wrapper = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-around' })};
  width: 20rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.75rem;
  padding: 0 0.5rem;
`;
