import { rest } from 'msw';

import labels from '@server/dummyData/labels';
import { LabelType } from '@type/types';

const fakeLabels: LabelType[] = [...labels];
const lastLabelsId = fakeLabels[fakeLabels.length - 1].id;

const getLabels = (req, res, ctx) => res(ctx.status(200), ctx.json(fakeLabels));

const postCreateLabel = (req, res, ctx) => {
  const { name, description, color, darkText } = req.body;
  fakeLabels.push({
    id: lastLabelsId + 1,
    name,
    description,
    color,
    darkText,
  });
  return res(ctx.status(201));
};

export default function labelHandlers() {
  return [
    rest.get('/api/labels', getLabels),
    rest.post('/api/labels/create', postCreateLabel),
  ];
}
