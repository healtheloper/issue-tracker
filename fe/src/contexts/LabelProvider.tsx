import { useContext, createContext, ReactNode, useMemo } from 'react';

import useAxios from '@hooks/useAxios';
import { LabelType } from '@type/types';

const LabelContext = createContext<{
  labels?: LabelType[];
  refetch: () => void;
} | null>(null);

export function LabelProvider({ children }) {
  const { state, refetch } = useAxios<{
    labels: LabelType[];
  }>('/api/labels');

  const { data: { labels } = {} } = state;
  const labelContextValue = useMemo(() => ({ labels, refetch }), [state]);

  return (
    <LabelContext.Provider value={labelContextValue}>
      {children}
    </LabelContext.Provider>
  );
}

export function useLabelContext() {
  const labelState = useContext(LabelContext);
  if (!labelState) throw new Error('Cannot find LabelProvider');
  return labelState;
}
