import { rest } from 'msw';

import mileStones from '@server/dummyData/milestones';
import { MilestoneType } from '@type/types';

const fakeMilestones: MilestoneType[] = [...mileStones];

const getMilestones = (req, res, ctx) =>
  res(ctx.status(200), ctx.json({ milestones: fakeMilestones }));

export default function milestoneHandlers() {
  return [rest.get('/api/milestones', getMilestones)];
}
