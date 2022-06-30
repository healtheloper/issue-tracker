import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import { Link } from 'react-router-dom';
import styled, { css, useTheme } from 'styled-components';

import Divider from '@components/data-display/Divider';
import IconTextBox from '@components/data-display/IconTextBox';
import { useLabelContext } from '@contexts/LabelProvider';
import { useMilestoneContext } from '@contexts/MilestoneProvider';
import mixin from '@style/mixin';

export default function TagTab({ activeTab }: { activeTab?: string }) {
  const { data: { countOfOpenMilestones } = {} } = useMilestoneContext();
  const { labels } = useLabelContext();
  const theme = useTheme();

  return (
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
            texts={['레이블', `(${labels?.length})`]}
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
            texts={['마일스톤', `(${countOfOpenMilestones})`]}
            spacing={0.625}
          />
        </TagBox>
      </StyleLink>
    </Wrapper>
  );
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
