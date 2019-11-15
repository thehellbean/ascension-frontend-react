import { User } from "../store/initialState";

interface ExpectedResponse {
  data: {
    user: User;
  };
}

export function login(username: string, password: string) {
  return (dispatch: Function) => {
    dispatch({ type: "START_LOGIN" });
    fetch("http://localhost:4000/api/v1/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then((json: ExpectedResponse) => {
        dispatch({ type: "LOGGED_IN", data: json.data.user });
      })
      .catch(_ => dispatch({ type: "LOGIN_FAILED" }));
  };
}
