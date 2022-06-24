import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Container from '@components/Container';
import FilterBar from '@components/UtilBar/FilterBar';
import TagTab from '@components/UtilBar/TagTab';

export default function UtilBar() {
  const navigate = useNavigate();

  const handleClickNewButton = () => {
    navigate('/createIssue');
  };

  return (
    <Container
      flexInfo={{ align: 'center', justify: 'space-between' }}
      mt="2rem"
    >
      <FilterBar />
      <Container
        flexInfo={{ align: 'center', justify: 'space-between' }}
        gap={1}
      >
        <TagTab />
        <Button variant="primary" size="small" onClick={handleClickNewButton}>
          <AddIcon fontSize="small" />
          <span>이슈 작성</span>
        </Button>
      </Container>
    </Container>
  );
}
