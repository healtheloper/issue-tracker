import { ThemeProvider } from 'styled-components';

import { useHeaderState } from '@contexts/HeaderProvider';
import useLogin from '@hooks/useLogin';
import Routes from '@pages/Routes';
import GlobalStyle from '@style/GlobalStyle';
import { darkTheme, lightTheme } from '@style/theme';

export default function App() {
  const { isDarkMode, isLogin } = useHeaderState();
  const { reLogin } = useLogin();
  if (isLogin) {
    reLogin();
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}
