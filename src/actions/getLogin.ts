export function getLoginStatus() {
  return (dispatch: Function) => {
    fetch("http://localhost:4000/api/v1/session", {
      credentials: "include",
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          dispatch({ type: "LOGGED_IN", data: json.data.user });
        }
      });
  };
}
