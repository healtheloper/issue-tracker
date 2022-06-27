import Container from '@components/Container';
import TextAreaBox from '@components/inputs/TextAreaBox';
import Comment from '@components/IssueBody/CommentSection/Comment';
import { useIssueContext } from '@contexts/IssueProvider';

export default function CommentSection() {
  const { issue: { comments } = {} } = useIssueContext();

  return (
    <Container>
      {comments?.map((comment) => (
        <Comment key={comment.id} commentData={comment} />
      ))}
      <TextAreaBox />
    </Container>
  );
}
