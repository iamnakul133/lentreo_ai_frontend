import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "./store";
import Routes from "./Routes";
import { toggleTheme } from "./store/actions";
import { makeTheme } from './theme';
import GlobalStyles from './components/GlobalStyles';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme);

  useEffect(() => {
    const prev = localStorage.getItem("theme");
    if (prev) {
      dispatch(toggleTheme(prev));
    } else {
      localStorage.setItem("theme", "dark");
      dispatch(toggleTheme("dark"));
    }
  }, [dispatch]);

  const theme = useMemo(() => makeTheme(themeMode), [themeMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Helmet titleTemplate="%s - SoulBuddy" />
          <CssBaseline />
          <GlobalStyles />
          <ScrollToTop />
          <Toaster 
            toastOptions={{ 
              duration: 5000,
              style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              },
            }} 
          />
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
