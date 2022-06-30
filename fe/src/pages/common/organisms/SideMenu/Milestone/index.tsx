import Container from '@components/layout/Container';
import ProgressBar from '@pages/common/organisms/SideMenu/Milestone/ProgressBar';
import { MilestoneType } from '@type/types';

export default function Milestone({ milestone }: { milestone: MilestoneType }) {
  const percent =
    milestone.totalCountOfIssues === 0
      ? 0
      : Math.floor(
          (milestone.countOfClosedIssues / milestone.totalCountOfIssues) * 100,
        );
  return (
    <Container flexInfo={{ direction: 'column' }} gap={1}>
      <ProgressBar percent={percent} />
      <span>{milestone.subject}</span>
    </Container>
  );
}
