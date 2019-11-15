export function uploadAudio(bookId: number, files: File[]) {
  return (dispatch: Function) => {
    let formData = new FormData();

    files.forEach(file => formData.append("audio[]", file));

    fetch(`http://localhost:4000/api/v1/books/${bookId}/audio/`, {
      credentials: "include",
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(jsonResponse =>
        dispatch({
          type: "NEW_AUDIO",
          data: {
            bookId: bookId,
            data: jsonResponse.data
          }
        })
      );
  };
}
