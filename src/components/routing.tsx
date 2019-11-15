import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AppState } from "../store/initialState";
import { connect } from "react-redux";

interface LoggedInProp {
  loggedIn: boolean;
}

const mapStateToProps = (state: AppState): LoggedInProp => {
  return {
    loggedIn: state.general.user !== undefined
  };
};

type RoutingProp = LoggedInProp & RouteProps;

function AuthenticatedRoute(props: RoutingProp) {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        props.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function NonAuthenticatedRoute(props: RoutingProp) {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !props.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const AuthRoute = connect(mapStateToProps)(AuthenticatedRoute);
const NonAuthRoute = connect(mapStateToProps)(NonAuthenticatedRoute);
export { AuthRoute, NonAuthRoute };
