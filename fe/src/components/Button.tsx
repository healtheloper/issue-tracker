import styled, { css } from 'styled-components';

import Squircle from '@components/Squircle';
import colors from '@constants/colors';
import { fontSize as myFontSize } from '@constants/fonts';
import { heights, widths } from '@constants/lengths';
import mixin from '@style/mixin';
import { IPaletteOptions } from '@style/theme';

type ButtonTypes = 'button' | 'submit' | 'reset';
type ButtonSizes = 'small' | 'large';

interface ButtonProps {
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
  variant?: keyof IPaletteOptions;
  type?: ButtonTypes;
  size?: ButtonSizes;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const buttonSizes = {
  small: {
    width: 7.5,
    height: 2.5,
    fontSize: myFontSize.small,
  },
  large: {
    width: widths.squircle.default,
    height: heights.squircle.default,
    fontSize: myFontSize.medium,
  },
};

export default function Button({
  width,
  height,
  fontSize,
  variant = 'primary',
  type = 'button',
  size = 'large',
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  const buttonFontSize =
    fontSize || typeof width === 'number'
      ? `${(width as number) * 0.1}rem`
      : buttonSizes[size].fontSize;

  const buttonWidth = width || buttonSizes[size].width;
  const buttonHeight = height || buttonSizes[size].height;

  return (
    <Squircle width={buttonWidth} height={buttonHeight}>
      <MyButton
        type={type}
        variant={variant}
        fontSize={buttonFontSize}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </MyButton>
    </Squircle>
  );
}

const MyButton = styled.button<{
  variant: string;
  type: ButtonTypes;
  fontSize: string;
}>`
  ${mixin.flexMixin({ align: 'center', justify: 'center' })}
  gap: 0.2rem;
  color: ${({ variant, theme }) =>
    variant === 'outlined' ? theme.palette.primary : colors.offWhite};
  font-size: ${({ fontSize }) => fontSize};
  width: 100%;
  height: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
  transition: opacity 0.2s;
  background-color: ${({ theme, variant }) => theme.palette[variant]};
  border: 2px solid
    ${({ theme, variant }) =>
      variant === 'outlined' ? theme.palette.primary : theme.palette[variant]};
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: default;
        `
      : css`
          :hover {
            opacity: 1;
          }
        `};
`;
