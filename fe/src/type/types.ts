import { IPalette } from '@style/theme';

export type ModalFilterType = {
  queryKey: string;
  queryValue: string;
};
export type UserIconSizeType = 'BIG' | 'SMALL';

export type MemberType = {
  id: number;
  identity: string;
  name: string;
  profileUrl: string | undefined;
};

export type LabelType = {
  id: number;
  name: string;
  description?: string;
  color: string;
};

export type MilestoneType = {
  id: number;
  subject: string;
  description?: string;
};

export type ModalContentType =
  | (MemberType & ModalFilterType)
  | (LabelType & ModalFilterType)
  | (MilestoneType & ModalFilterType);

export type IssueType = {
  id: number;
  status: string;
  subject: string;
  description: string;
  writer: string;
  profileUrl: string;
  createdDateTime: string;
  milestone: MilestoneType | null;
  labels: LabelType[];
  assignees: MemberType[];
};

declare module 'styled-components' {
  interface DefaultTheme {
    palette: IPalette;
  }
}
