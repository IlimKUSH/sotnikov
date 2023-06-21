import { FC } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './pages/routes/app.routes';

const Routes: FC = () => {
  const appRoutes = useRoutes(routes);
  return appRoutes;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Box bgcolor="#EBEBF0">
            <CssBaseline />
            <Routes />
          </Box>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;