import Container from '@components/Container';
import TextAreaBox from '@components/inputs/TextAreaBox';
import Comment from '@components/IssueBody/CommentSection/Comment';
import { useIssueState } from '@contexts/IssueProvider';

export default function CommentSection() {
  const { comments } = useIssueState();

  return (
    <Container>
      {comments.map((comment) => (
        <Comment commentData={comment} />
      ))}
      <TextAreaBox />
    </Container>
  );
}
