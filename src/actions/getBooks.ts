export function getBooks() {
  return (dispatch: Function) => {
    dispatch({ type: "START_GET_BOOKS" });
    fetch("http://localhost:4000/api/v1/books", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => dispatch({ type: "GET_BOOKS", data: json.data }));
  };
}
