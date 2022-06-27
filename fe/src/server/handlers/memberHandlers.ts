import { rest } from 'msw';

import members from '@server/dummyData/members';
import { MemberType } from '@type/types';

const fakeMembers: MemberType[] = [...members];

const getMembers = (req, res, ctx) =>
  res(ctx.status(200), ctx.json({ members: fakeMembers }));

export default function memberHandlers() {
  return [rest.get('/api/members', getMembers)];
}
