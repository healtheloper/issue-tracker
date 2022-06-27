import { ThemeProvider } from 'styled-components';

import { useHeaderState } from '@contexts/HeaderProvider';
import { LabelProvider } from '@contexts/LabelProvider';
import Routes from '@pages/Routes';
import GlobalStyle from '@style/GlobalStyle';
import { darkTheme, lightTheme } from '@style/theme';

export default function App() {
  const { isDarkMode } = useHeaderState();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <LabelProvider>
        <GlobalStyle />
        <Routes />
      </LabelProvider>
    </ThemeProvider>
  );
}
