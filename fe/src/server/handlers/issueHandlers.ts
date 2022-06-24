import { rest } from 'msw';

import issues from '@server/dummyData/issues';
import { filterIssues } from '@server/filterUtil';
import { IssueType } from '@type/types';

let fakeIssues: IssueType[] = [...issues];

const getIssues = (req, res, ctx) => {
  const filteredIssues = filterIssues(req.url.search, fakeIssues);
  return res(ctx.status(200), ctx.json(filteredIssues));
};

const postCreateIssue = (req, res, ctx) => {
  const {
    subject,
    description,
    labels,
    milestone,
    assignees,
    writer,
    profileUrl,
  } = req.body;
  const newIssueId = fakeIssues[fakeIssues.length - 1].id + 1;
  const newIssue: IssueType = {
    id: newIssueId,
    subject,
    description,
    writer,
    profileUrl,
    status: 'OPEN',
    createdDateTime: new Date().toISOString(),
    labels,
    milestone,
    assignees,
  };
  fakeIssues.push(newIssue);
  return res(ctx.status(201));
};

const patchUpdatedStatus: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
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

export default function issueHandlers() {
  return [
    rest.get('/api/issues', getIssues),
    rest.post('/api/createIssue', postCreateIssue),
    rest.patch('/api/issues/status/update', patchUpdatedStatus),
  ];
}
