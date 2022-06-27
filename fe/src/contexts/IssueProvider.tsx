import {
  useState,
  useContext,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

import { IssueType } from '@type/types';

type IssueDispatch = Dispatch<SetStateAction<IssueType>>;

const IssueStateContext = createContext<IssueType | null>(null);
const IssueDispatchContext = createContext<IssueDispatch | null>(null);

interface IIssueProvider {
  initialIssueData: IssueType;
  children: ReactNode;
}

export function IssueProvider({ initialIssueData, children }: IIssueProvider) {
  const [issue, setIssue] = useState(initialIssueData);

  return (
    <IssueStateContext.Provider value={issue}>
      <IssueDispatchContext.Provider value={setIssue}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
}

export function useIssueState() {
  const issueState = useContext(IssueStateContext);
  if (!issueState) throw new Error('Cannot find IssueProvider');
  return issueState;
}

export function useSetIssue() {
  const setIssue = useContext(IssueDispatchContext);
  if (!setIssue) throw new Error('Cannot find IssueProvider');
  return setIssue;
}
