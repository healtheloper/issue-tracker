import { useState, useRef } from 'react';

import Container from '@components/Container';
import IssueInfo from '@components/IssueHeader/IssueInfo';
import IssueUtilButtons from '@components/IssueHeader/IssueUtilButtons';

export default function IssueHeader() {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <Container flexInfo={{ justify: 'space-between' }} margin="2rem 0">
      <IssueInfo isTitleEditing={isTitleEditing} titleRef={titleRef} />
      <IssueUtilButtons
        titleRef={titleRef}
        isTitleEditing={isTitleEditing}
        setIsTitleEditing={setIsTitleEditing}
      />
    </Container>
  );
}
