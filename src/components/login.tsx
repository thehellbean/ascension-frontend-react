import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../actions/login";
import { AppState } from "../store/initialState";
import Typography from "@material-ui/core/Typography";
import { getLoginStatus } from "../actions/getLogin";

const useStyles = makeStyles(
  createStyles({
    grid: {
      textAlign: "center",
      marginTop: 100
    },
    textField: {
      width: "50%"
    },
    paper: {
      width: "35%",
      height: "30vh",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex"
    },
    errorText: {
      color: "#ef4336",
      marginBottom: 10
    }
  })
);

interface DispatchProps {
  dispatch: Function;
}

interface StateProps {
  loginInProgress: boolean;
  loginFailed: boolean;
  loggedIn: boolean;
}

type LoginProps = DispatchProps & StateProps;

function Login(props: LoginProps) {
  const { dispatch, loggedIn } = props;

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  const [username, setUsername] = useState("");
  const [usernameLabel, setUsernameLabel] = useState("Username");
  const [password, setPassword] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("Password");

  const history = useHistory();
  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  const classes = useStyles();
  const handleSubmit = () => {
    if (username === "") {
      setUsernameLabel("Username can't be empty");
    } else if (password === "") {
      setPasswordLabel("Password can't be empty");
    } else {
      setUsernameLabel("Username");
      setPasswordLabel("Password");
      props.dispatch(login(username, password));
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.grid} spacing={3}>
        <Grid item xs={12}>
          <TextField
            label={usernameLabel}
            value={username}
            error={usernameLabel !== "Username"}
            onChange={event => setUsername(event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={passwordLabel}
            value={password}
            error={passwordLabel !== "Password"}
            onChange={event => setPassword(event.target.value)}
            type="password"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit}>Login</Button>
        </Grid>
        <Grid item xs={12}>
          {props.loginFailed ? (
            <Typography variant="h6" className={classes.errorText}>
              Login failed
            </Typography>
          ) : null}
          {props.loginInProgress ? <CircularProgress /> : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    loginInProgress: state.general.loginInProgress,
    loggedIn: state.general.user !== undefined,
    loginFailed: state.general.loginFailed
  };
};

export default connect(mapStateToProps)(Login);
