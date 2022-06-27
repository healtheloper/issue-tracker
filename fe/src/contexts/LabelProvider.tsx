import {
  useState,
  useContext,
  createContext,
  ReactNode,
  SetStateAction,
  useMemo,
  Dispatch,
} from 'react';

import { LabelType } from '@type/types';

interface ILabelProvider {
  labels: LabelType[];
  setLabels: Dispatch<SetStateAction<LabelType[]>>;
}

const LabelContext = createContext<ILabelProvider | null>(null);

interface ILabelProviderProps {
  initialLabelData?: LabelType[];
  children: ReactNode;
}

export function LabelProvider({
  initialLabelData,
  children,
}: ILabelProviderProps) {
  const [labels, setLabels] = useState(initialLabelData || []);
  const labelContextValue = useMemo<ILabelProvider>(
    () => ({ labels, setLabels }),
    [],
  );
  return (
    <LabelContext.Provider value={labelContextValue}>
      {children}
    </LabelContext.Provider>
  );
}

export function useLabelContext() {
  const issueState = useContext(LabelContext);
  if (!issueState) throw new Error('Cannot find IssueProvider');
  return issueState;
}
