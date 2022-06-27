import { IPalette } from '@style/theme';

export type CommentType = {
  writerIdentity: string;
  createdDateTime: string;
  content: string;
};

export type PopoverFilterType = {
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
  darkText?: boolean;
};

export type MilestoneType = {
  id: number;
  subject: string;
  description?: string;
};

export type PopoverContentType =
  | (MemberType & PopoverFilterType)
  | (LabelType & PopoverFilterType)
  | (MilestoneType & PopoverFilterType);

export type IssueType = {
  id: number;
  status: string;
  subject: string;
  comments: CommentType[];
  writer: string;
  profileUrl: string;
  createdDateTime: string;
  milestone?: MilestoneType;
  labels: LabelType[];
  assignees: MemberType[];
};

declare module 'styled-components' {
  interface DefaultTheme {
    palette: IPalette;
  }
}
