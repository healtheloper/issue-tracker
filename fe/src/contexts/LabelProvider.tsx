import {
  useState,
  useContext,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

import useAxios from '@hooks/useAxios';
import { LabelType } from '@type/types';

const LabelStateContext = createContext<LabelType[] | null>(null);
const LabelSetStateContext = createContext<Dispatch<
  SetStateAction<LabelType[]>
> | null>(null);

interface ILabelProviderProps {
  children: ReactNode;
}

export function LabelProvider({ children }: ILabelProviderProps) {
  const { data: { labels: initLabels } = {} } = useAxios<{
    labels: LabelType[];
  }>('/api/labels');

  const [labels, setLabels] = useState(initLabels || []);

  return (
    <LabelStateContext.Provider value={labels}>
      <LabelSetStateContext.Provider value={setLabels}>
        {children}
      </LabelSetStateContext.Provider>
    </LabelStateContext.Provider>
  );
}

export function useLabelStateContext() {
  const labelState = useContext(LabelStateContext);
  if (!labelState) throw new Error('Cannot find LabelProvider');
  return labelState;
}

export function useLabelSetStateContext() {
  const labelSetState = useContext(LabelSetStateContext);
  if (!labelSetState) throw new Error('Cannot find LabelProvider');
  return labelSetState;
}
