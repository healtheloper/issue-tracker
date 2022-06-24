import { useOutletContext } from 'react-router-dom';

import CreateLabelBox from '@components/CreateLabelBox';
import LabelTable from '@components/LabelTable';
import useAxios from '@hooks/useAxios';
import { OutletContext } from '@pages/LabelMilestoneLayout';
import { LabelType } from '@type/types';

export default function LabelPage() {
  const [isAdding] = useOutletContext<OutletContext>();
  const { data: labels } = useAxios<LabelType[]>('/api/labels', 'get');

  return (
    <>
      {isAdding && <CreateLabelBox />}
      <LabelTable labels={labels} />
    </>
  );
}
