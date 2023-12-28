import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import vi from 'date-fns/locale/vi';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { LoadingProvider } from 'src/contexts/loading-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'react-perfect-scrollbar/dist/css/styles.css';
import classes from './_app.module.css';
import { ConfigProvider, Image } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <div className={classes.globalStyle}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Quản lý tội phạm
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
          <ConfigProvider
            locale={viVN}
            theme={{
              components: {
                Image: {
                  zIndexPopupBase: 1300,
                },
              }
            }}
          >
            <LoadingProvider>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <AuthConsumer>
                    {
                      (auth) => auth.isFinished
                        ? <SplashScreen />
                        : getLayout(<Component {...pageProps} />)
                    }
                  </AuthConsumer>
                </ThemeProvider>
              </AuthProvider>
            </LoadingProvider>
          </ConfigProvider>
        </LocalizationProvider>
      </CacheProvider >
    </div>
  );
};

export default App;
