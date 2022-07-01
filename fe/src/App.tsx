import { ThemeProvider } from 'styled-components';

import { useHeaderDispatch, useHeaderState } from '@contexts/HeaderProvider';
import useLogin from '@hooks/useLogin';
import Routes from '@pages/Routes';
import GlobalStyle from '@style/GlobalStyle';
import { darkTheme, lightTheme } from '@style/theme';

export default function App() {
  const { isDarkMode } = useHeaderState();
  const headerDispatch = useHeaderDispatch();
  const { userInfo } = useLogin();
  if (userInfo) {
    headerDispatch({ type: 'LOGIN', userInfo });
  }
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}
