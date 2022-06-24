import styled, { css } from 'styled-components';

import colors from '@constants/colors';

export interface LabelProps {
  text: string;
  darkText?: boolean;
  bgColor: string;
}

export default function Label({ text, darkText = false, bgColor }: LabelProps) {
  return (
    <LabelContainer darkText={darkText} bgColor={bgColor}>
      {text}
    </LabelContainer>
  );
}

const LabelContainer = styled.div<{ bgColor: string; darkText?: boolean }>`
  padding: 4px 16px;
  border-radius: 30px;
  font-size: 0.75rem;
  width: fit-content;
  ${({ darkText, bgColor }) => css`
    color: ${darkText ? colors.black : colors.offWhite};
    background: ${bgColor};
  `}
`;
