export const logout = () => (dispatch: Function) => {
  fetch("http://localhost:4000/api/v1/session", {
    method: "DELETE",
    credentials: "include"
  }).then(res => {
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
    }
  });
};
