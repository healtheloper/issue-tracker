import { forwardRef } from 'react';
import styled from 'styled-components';

import Squircle from '@components/layout/Squircle';

function InputBox(props, ref) {
  return (
    <Squircle width="100%">
      <MyInput ref={ref} {...props} />
    </Squircle>
  );
}

export default forwardRef(InputBox);

const MyInput = styled.input`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.palette.fontColor};
  background-color: ${({ theme }) => theme.palette.darkerBgColor};
  padding: 0rem 1rem;
  :focus-visible {
    background-color: ${({ theme }) => theme.palette.bgColor};
    outline: 1px solid ${({ theme }) => theme.palette.borderColor};
  }
`;
