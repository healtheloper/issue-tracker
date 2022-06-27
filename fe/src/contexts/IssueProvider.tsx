import { useContext, createContext, ReactNode, useMemo } from 'react';

import useAxios from '@hooks/useAxios';
import { IssueType } from '@type/types';

const IssueContext = createContext<{
  issue?: IssueType;
  refetch: () => void;
} | null>(null);

interface IIssueProvider {
  issueId: number;
  children: ReactNode;
}

export function IssueProvider({ issueId, children }: IIssueProvider) {
  const { state, refetch } = useAxios<IssueType>(`/api/issue/${issueId}`);

  const { data: issue } = state;
  const issueContextValue = useMemo(() => ({ issue, refetch }), [state]);

  return (
    <IssueContext.Provider value={issueContextValue}>
      {children}
    </IssueContext.Provider>
  );
}

export function useIssueContext() {
  const issueState = useContext(IssueContext);
  if (!issueState) throw new Error('Cannot find IssueProvider');
  return issueState;
}
