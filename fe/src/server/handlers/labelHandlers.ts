import { rest } from 'msw';

import labels from '@server/dummyData/labels';
import { LabelType } from '@type/types';

let fakeLabels: LabelType[] = [...labels];
const lastLabelsId = fakeLabels[fakeLabels.length - 1].id;

const getLabels = (req, res, ctx) =>
  res(ctx.status(200), ctx.json({ labels: fakeLabels }));

const deleteLabel = (req, res, ctx) => {
  const { id } = req.params;
  fakeLabels = fakeLabels.filter((label) => label.id !== Number(id));
  return res(ctx.status(204));
};

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

const patchLabel = (req, res, ctx) => {
  const { id } = req.params;
  const { name, description, color, darkText }: LabelType = req.body;
  const label = fakeLabels.find((fLabel) => fLabel.id === Number(id));
  if (!label) {
    return res(
      ctx.status(404),
      res.json({ status: 'NOT_FOUND', message: '존재하지 않는 라벨입니다.' }),
    );
  }
  fakeLabels = fakeLabels.filter((fLabel) => fLabel.id !== Number(id));
  const newLabel = {
    ...label,
    ...(name ? { name } : {}),
    ...(description ? { description } : {}),
    ...(color ? { color } : {}),
    ...(darkText ? { darkText } : {}),
  };
  fakeLabels.push(newLabel);
  return res(ctx.status(200), ctx.json(newLabel));
};

export default function labelHandlers() {
  return [
    rest.get('/api/labels', getLabels),
    rest.post('/api/labels/create', postCreateLabel),
    rest.delete('/api/labels/:id', deleteLabel),
    rest.patch('/api/labels/:id', patchLabel),
  ];
}
