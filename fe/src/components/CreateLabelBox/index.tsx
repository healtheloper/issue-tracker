import styled from 'styled-components';

import CreateLabelBody from '@components/CreateLabelBox/CreateLabelBody';

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 1rem;
  margin-top: 1.5rem;
  background-color: ${({ theme }) => theme.palette.contentColor};
`;

export default function CreateLabelBox() {
  return (
    <Wrapper>
      <CreateLabelBody />
    </Wrapper>
  );
}
