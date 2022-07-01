import { rest } from 'msw';

import issues from '@server/dummyData/issues';
import fakeLabels from '@server/dummyData/labels';
import fakeMembers from '@server/dummyData/members';
import fakeMileStones from '@server/dummyData/milestones';
import { filterIssues } from '@server/filterUtil';
import { IssueType, ReplyType } from '@type/types';

let fakeIssues: IssueType[] = [...issues];

const getIssue = (req, res, ctx) => {
  const { id } = req.params;
  const targetIssue = fakeIssues.find((issue) => issue.id === Number(id));
  return res(ctx.status(200), ctx.json(targetIssue));
};

const getIssues = (req, res, ctx) => {
  const filteredIssues = filterIssues(req.url.search, fakeIssues);
  return res(ctx.status(200), ctx.json(filteredIssues));
};

const postCreateIssue = (req, res, ctx) => {
  const { subject, writerId, assigneeIds, labelIds, milestoneId, comment } =
    req.body;

  const writerInfo = fakeMembers.find((m) => m.id === writerId);
  if (!writerInfo) {
    return res(
      ctx.status(404),
      ctx.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 회원입니다',
      }),
    );
  }
  const milestone = fakeMileStones.milestones.find((m) => m.id === milestoneId);
  if (milestoneId && !milestone) {
    return res(
      ctx.status(404),
      ctx.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 마일스톤입니다.',
      }),
    );
  }

  const assignees = fakeMembers.filter((m) => assigneeIds.includes(m.id));
  if (assigneeIds.length !== assignees.length) {
    return res(
      ctx.status(404),
      ctx.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 회원입니다.',
      }),
    );
  }

  const labels = fakeLabels.filter((l) => labelIds.includes(l.id));
  if (labelIds.length !== labels.length) {
    return res(
      ctx.status(404),
      ctx.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 라벨입니다.',
      }),
    );
  }

  const newIssueId = fakeIssues[fakeIssues.length - 1].id + 1;
  const newIssue: IssueType = {
    id: newIssueId,
    status: 'OPEN',
    subject,
    writer: writerInfo.identity,
    profileUrl: writerInfo.profileUrl,
    createdDateTime: new Date().toISOString(),
    milestone,
    assignees,
    labels,
    replies: [
      {
        id: new Date().getTime(),
        writer: writerInfo.identity,
        comment,
        profileUrl: writerInfo.profileUrl,
        createdDateTime: new Date().toISOString(),
      },
    ],
  };
  fakeIssues.push(newIssue);
  return res(ctx.status(201));
};

const updateStatus: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const {
    updatedStatus,
    idOfIssues,
  }: { updatedStatus: 'OPEN' | 'CLOSE'; idOfIssues: number[] } = req.body;
  const updatedIssues = fakeIssues.map((issue) => {
    const updatedIssue = { ...issue };
    if (idOfIssues.includes(issue.id)) {
      updatedIssue.status = updatedStatus;
    }
    return updatedIssue;
  });
  fakeIssues = updatedIssues;
  return res(ctx.status(200), ctx.json(fakeIssues));
};

const updateSubject: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { subject }: { subject: string } = req.body;
  const { id: targetId } = req.params;
  const updatedIssues = fakeIssues.map((issue) => {
    const updatedIssue = { ...issue };
    if (updatedIssue.id === Number(targetId)) {
      updatedIssue.subject = subject;
    }
    return updatedIssue;
  });
  fakeIssues = updatedIssues;
  return res(ctx.status(200));
};

const updateLabels: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { labels: labelIds }: { labels: number[] } = req.body;
  const labelDatas = fakeLabels.filter((label) => labelIds.includes(label.id));
  const { id: targetId } = req.params;
  const updatedIssues = fakeIssues.map((issue) => {
    const updatedIssue = { ...issue };
    if (updatedIssue.id === Number(targetId)) {
      updatedIssue.labels = labelDatas;
    }
    return updatedIssue;
  });
  fakeIssues = updatedIssues;
  return res(ctx.status(200));
};

const updateMilestone: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { milestoneId }: { milestoneId: number | null } = req.body;
  const milestoneData = fakeMileStones.milestones.find(
    (milestone) => milestone.id === milestoneId,
  );
  const { id: targetId } = req.params;
  const updatedIssues = fakeIssues.map((issue) => {
    const updatedIssue = { ...issue };
    if (updatedIssue.id === Number(targetId)) {
      updatedIssue.milestone = milestoneData;
    }
    return updatedIssue;
  });
  fakeIssues = updatedIssues;
  return res(ctx.status(200));
};

const updateAssignees: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { assignees: assigneeIds }: { assignees: number[] } = req.body;
  const assigneeDatas = fakeMembers.filter((member) =>
    assigneeIds.includes(member.id),
  );
  const { id: targetId } = req.params;
  const updatedIssues = fakeIssues.map((issue) => {
    const updatedIssue = { ...issue };
    if (updatedIssue.id === Number(targetId)) {
      updatedIssue.assignees = assigneeDatas;
    }
    return updatedIssue;
  });
  fakeIssues = updatedIssues;
  return res(ctx.status(200));
};

const deleteIssue: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { id: targetId } = req.params;
  const updatedIssues = fakeIssues.filter(
    (issue) => issue.id !== Number(targetId),
  );
  fakeIssues = updatedIssues;
  return res(ctx.status(200));
};

const addReply: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { id: issueId } = req.params;
  const { writerId, comment }: { writerId: number; comment: string } = req.body;
  const writerInfo = fakeMembers.find((member) => member.id === writerId);
  if (!writerInfo) {
    return res(
      ctx.status(404),
      ctx.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 회원입니다',
      }),
    );
  }
  const targetIssue = fakeIssues.find((issue) => issue.id === Number(issueId));
  if (!targetIssue) {
    return res(
      ctx.status(404),
      ctx.json({
        status: 'NOT_FOUND',
        message: '존재하지 않는 이슈입니다',
      }),
    );
  }
  const newReply = {
    id: new Date().getTime(),
    writer: writerInfo.identity,
    comment,
    profileUrl: writerInfo.profileUrl,
    createdDateTime: new Date().toISOString(),
  };
  targetIssue.replies.push(newReply);
  return res(ctx.status(200));
};

const updateReply: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { id: replyId } = req.params;
  const { comment: newComment } = req.body;
  const fakeReplies: ReplyType[] = [];
  fakeIssues.forEach((issue) => fakeReplies.push(...issue.replies));
  const targetReply = fakeReplies.find((reply) => reply.id === Number(replyId));
  if (!targetReply) return res(ctx.status(404));
  targetReply.comment = newComment;
  return res(ctx.status(200));
};

export default function issueHandlers() {
  return [
    rest.get('/api/issues', getIssues),
    rest.get('/api/issues/:id', getIssue),
    rest.post('/api/issues', postCreateIssue),
    rest.post('/api/issues/:id/replies', addReply),
    rest.patch('/api/issues/status', updateStatus),
    rest.patch('/api/issues/:id/subject', updateSubject),
    rest.patch('/api/issues/:id/labels', updateLabels),
    rest.patch('/api/issues/:id/milestone', updateMilestone),
    rest.patch('/api/issues/:id/assignees', updateAssignees),
    rest.patch('/api/issues/replies/:id', updateReply),
    rest.delete('/api/issues/:id', deleteIssue),
  ];
}
