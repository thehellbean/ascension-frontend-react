export function addBook(title: string, author: string) {
  return async (dispatch: Function) => {
    const response = await fetch("http://localhost:4000/api/v1/books", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        book: {
          title,
          author,
          isbn: "1010101"
        }
      })
    });
    const jsonResponse = await response.json();

    if (response.status === 200) {
      dispatch({
        type: "NEW_BOOK",
        data: jsonResponse.data
      });
    }
  };
}
