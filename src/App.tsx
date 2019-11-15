import React from "react";
import "./App.css";
import Header from "./components/header";
import { BrowserRouter as Router } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import Home from "./components/home";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import Login from "./components/login";
import { AuthRoute, NonAuthRoute } from "./components/routing";

export const store = configureStore();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    app: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    }
  })
);

const App: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <Header />
          <main className={classes.app}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.container}>
              <NonAuthRoute exact path="/login">
                <Login />
              </NonAuthRoute>
              <AuthRoute exact path="/">
                <Home />
              </AuthRoute>
            </Container>
          </main>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
