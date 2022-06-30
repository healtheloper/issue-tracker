import { rest } from 'msw';

import mileStones from '@server/dummyData/milestones';
import { MilestoneType } from '@type/types';

interface IMilestoneResponse {
  countOfOpenMilestones: number;
  countOfClosedMilestones: number;
  milestones: MilestoneType[];
}

const fakeMilestones: IMilestoneResponse = mileStones;
let lastMilestoneId =
  mileStones.countOfOpenMilestones + mileStones.countOfClosedMilestones + 1;

const getMilestones = (req, res, ctx) => {
  const target = new URLSearchParams(req.url.search).get('status') || 'OPEN';
  const filteredMilestone = {
    ...fakeMilestones,
    milestones: fakeMilestones.milestones.filter(
      (milestone) => milestone.status === target,
    ),
  };
  filteredMilestone.milestones.sort((a, b) => a.id - b.id);
  return res(ctx.status(200), ctx.json(filteredMilestone));
};

const postMilestones = (req, res, ctx) => {
  const { subject, description, endDate } = req.body;
  const newMilestone = {
    id: lastMilestoneId,
    subject,
    description,
    endDate,
    status: 'OPEN',
    totalCountOfIssues: 0,
    countOfClosedIssues: 0,
  };
  lastMilestoneId += 1;
  fakeMilestones.milestones.push(newMilestone);
  fakeMilestones.countOfOpenMilestones = fakeMilestones.milestones.filter(
    (milestone) => milestone.status === 'OPEN',
  ).length;
  return res(ctx.status(200), ctx.json(newMilestone));
};

const patchMilestone = (req, res, ctx) => {
  const { id } = req.params;
  const { subject, description, endDate }: Partial<MilestoneType> = req.body;
  const milestone = fakeMilestones.milestones.find(
    (fMilestone) => fMilestone.id === Number(id),
  );
  if (!milestone) {
    return res(
      ctx.status(404),
      res.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 마일스톤입니다.',
      }),
    );
  }
  fakeMilestones.milestones = fakeMilestones.milestones.filter(
    (fMilestone) => fMilestone.id !== Number(id),
  );
  const newMilestone = {
    ...milestone,
    ...(subject ? { subject } : {}),
    ...(description ? { description } : {}),
    ...(endDate ? { endDate } : {}),
  };
  fakeMilestones.milestones.push(newMilestone);
  return res(ctx.status(200), ctx.json(newMilestone));
};

const patchMilestoneState = (req, res, ctx) => {
  const { id } = req.params;
  const { updatedStatus } = req.body;
  const milestone = fakeMilestones.milestones.find(
    (fMilestone) => fMilestone.id === Number(id),
  );
  if (!milestone) {
    return res(
      ctx.status(404),
      res.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 마일스톤입니다.',
      }),
    );
  }
  fakeMilestones.milestones = fakeMilestones.milestones.map((fMilestone) => {
    if (fMilestone.id === Number(id)) {
      return {
        ...fMilestone,
        status: updatedStatus,
      };
    }
    return fMilestone;
  });
  return res(
    ctx.status(200),
    ctx.json({
      status: 'OK',
      message: '마일스톤의 상태 변경이 정상적으로 처리되었습니다.',
    }),
  );
};

const deleteMilestone = (req, res, ctx) => {
  const { id } = req.params;

  const milestone = fakeMilestones.milestones.find(
    (fMilestone) => fMilestone.id === Number(id),
  );
  if (!milestone) {
    return res(
      ctx.status(404),
      res.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 정보입니다.',
      }),
    );
  }

  fakeMilestones.milestones = fakeMilestones.milestones.filter(
    (fMilestone) => fMilestone.id !== Number(id),
  );

  fakeMilestones.countOfOpenMilestones = fakeMilestones.milestones.filter(
    (fMilestone) => fMilestone.status === 'OPEN',
  ).length;

  fakeMilestones.countOfClosedMilestones = fakeMilestones.milestones.filter(
    (fMilestone) => fMilestone.status === 'CLOSED',
  ).length;

  return res(
    ctx.status(200),
    ctx.json({
      status: 'OK',
      message: '정상적으로 삭제 처리되었습니다.',
    }),
  );
};

export default function milestoneHandlers() {
  return [
    rest.get('/api/milestones', getMilestones),
    rest.post('/api/milestones', postMilestones),
    rest.patch('/api/milestones/:id', patchMilestone),
    rest.patch('/api/milestones/:id/status', patchMilestoneState),
    rest.delete('/api/milestones/:id', deleteMilestone),
  ];
}
