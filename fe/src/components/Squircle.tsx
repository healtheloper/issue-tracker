import styled from 'styled-components';

import { widths, heights } from '@constants/lengths';
import { ITheme } from '@style/theme';
import { getCssValueByUnit } from '@util/css';

interface ISquircleProps {
  width?: number | string;
  height?: number | string;
  unit?: string;
  opacity?: number;
  backgroundColor?: string;
  borderLineColor?: string;
  theme: ITheme;
}

const Squircle = styled.div<ISquircleProps>`
  border-radius: ${({ height }) =>
    typeof height === 'number' ? `${0.3 * height}rem` : '1.2rem'};
  width: ${({ width, unit }) =>
    getCssValueByUnit(width, unit) || widths.squircle.default};
  height: ${({ height, unit }) =>
    getCssValueByUnit(height, unit) || heights.squircle.default};
  opacity: ${({ opacity }) => opacity || 1};
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`};
  ${({ borderLineColor }) =>
    borderLineColor && `border: 1px solid ${borderLineColor}`};
`;

export default Squircle;
