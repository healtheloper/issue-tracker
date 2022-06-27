import { DefaultTheme } from 'styled-components';

import colors from '@constants/colors';

export interface IPaletteOptions {
  default: string;
  primary: string;
  warning: string;
  github: string;
  outlined: string;
}

export interface IPalette extends IPaletteOptions {
  bgColor: string;
  primaryBgColor: string;
  fontColor: string;
  borderColor: string;
  contentColor: string;
  reverseBgColor: string;
  lighterBgColor: string;
  darkerBgColor: string;
  placeholder: string;
}

export interface ITheme extends DefaultTheme {
  palette: IPalette;
}

const darkPalette: IPalette = {
  default: colors.offWhite,
  primary: colors.blue,
  warning: colors.red,
  github: colors.black2,
  outlined: colors.black,
  bgColor: colors.black,
  primaryBgColor: colors.skyBlue,
  fontColor: colors.white1,
  borderColor: colors.grey2,
  reverseBgColor: colors.white1,
  contentColor: colors.black,
  lighterBgColor: colors.black3,
  darkerBgColor: colors.black2,
  placeholder: colors.grey1,
};

const lightPalette: IPalette = {
  default: colors.offWhite,
  primary: colors.blue,
  warning: colors.red,
  github: colors.black2,
  outlined: colors.white1,
  bgColor: colors.white1,
  primaryBgColor: colors.skyBlue,
  fontColor: colors.black,
  borderColor: colors.grey1,
  reverseBgColor: colors.black,
  contentColor: colors.white,
  lighterBgColor: colors.white1,
  darkerBgColor: colors.white3,
  placeholder: colors.grey3,
};

const darkTheme: ITheme = {
  palette: darkPalette,
};

const lightTheme: ITheme = {
  palette: lightPalette,
};

export { darkTheme, lightTheme };
