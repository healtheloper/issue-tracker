import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import mixin from '@style/mixin';

interface IIconTextBoxProps {
  Icon?: React.ReactNode;
  isIconAfterText?: boolean;
  texts?: string[];
  color?: string;
  spacing?: number;
  fontSize?: number;
  fontWeight?: number;
  onClick?: () => void;
}

export default function IconTextBox({
  Icon,
  isIconAfterText = false,
  texts,
  color = 'inherit',
  spacing,
  fontSize,
  fontWeight,
  onClick,
}: IIconTextBoxProps) {
  const Texts = texts?.map((text) => <span key={uuid()}>{text}</span>);
  return (
    <BoxContainer
      color={color}
      spacing={spacing}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
    >
      {isIconAfterText ? (
        <>
          {Texts}
          {Icon}
        </>
      ) : (
        <>
          {Icon}
          {Texts}
        </>
      )}
    </BoxContainer>
  );
}

const BoxContainer = styled.div<{
  color?: string;
  spacing?: number;
  fontSize?: number;
  fontWeight?: number;
}>`
  ${mixin.flexMixin({ align: 'center' })}
  color: ${({ color }) => color};
  ${({ spacing }) => spacing && `gap : ${spacing}rem;`};
  ${({ fontSize }) => fontSize && `font-size : ${fontSize}rem;`};
  ${({ fontWeight }) => fontWeight && `font-weight : ${fontWeight};`};
`;
