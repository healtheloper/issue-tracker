import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import { Link } from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';

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

export default function TagTab({ activeTab }: { activeTab?: string }) {
  const serverDomain = process.env.SERVER;
  const milestoneURL = `${serverDomain}/api/milestones`;
  const labelURL = `${serverDomain}/api/labels`;
  const { data: milestoneData } =
    useAxios<MilestoneAPIResponseType>(milestoneURL);
  const { data: labelData } = useAxios<LabelAPIResponseType>(labelURL);
  const theme = useTheme();

  return milestoneData ? (
    <Wrapper>
      <StyleLink to="/list/label">
        <TagBox
          bgColor={
            activeTab === 'label'
              ? theme.palette.darkerBgColor
              : theme.palette.bgColor
          }
          isLeft
        >
          <IconTextBox
            Icon={<LocalOfferOutlinedIcon />}
            texts={['레이블', `(${labelData?.labels.length})`]}
            spacing={0.625}
          />
        </TagBox>
      </StyleLink>
      <Divider isVertical length="100%" margin="0" />
      <StyleLink to="/list/milestone">
        <TagBox
          bgColor={
            activeTab === 'milestone'
              ? theme.palette.darkerBgColor
              : theme.palette.bgColor
          }
          isLeft={false}
        >
          <IconTextBox
            Icon={<SignpostOutlinedIcon />}
            texts={['마일스톤', `(${milestoneData?.milestones.length})`]}
            spacing={0.625}
          />
        </TagBox>
      </StyleLink>
    </Wrapper>
  ) : null;
}

const TagBox = styled.div<{ bgColor: string; isLeft: boolean }>`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 100%;
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
  ${({ isLeft }) =>
    isLeft
      ? css`
          border-top-left-radius: 0.75rem;
          border-bottom-left-radius: 0.75rem;
        `
      : css`
          border-top-right-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
        `}
`;

const StyleLink = styled(Link)`
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  ${mixin.flexMixin({ align: 'center', justify: 'space-around' })};
  width: 20rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.75rem;
`;
