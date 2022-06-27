import { useOutletContext } from 'react-router-dom';

import CreateLabelBox from '@components/CreateLabelBox';
import LabelTable from '@components/LabelTable';
import { OutletContext } from '@pages/LabelMilestoneLayout';

export default function LabelPage() {
  const [isAdding] = useOutletContext<OutletContext>();

  return (
    <>
      {isAdding && <CreateLabelBox />}
      <LabelTable />
    </>
  );
}
