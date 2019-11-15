import { State } from "../store/initialState";
import { Action } from "../actions/actions";

function updateIn<T, K extends keyof T>(
  container: T[],
  target: T,
  property: K,
  value: T[K]
): T[] {
  const updatedTarget: T = {
    ...target,
    [property]: value
  };

  const targetPos = container.indexOf(target);
  const output = container.map((value: T, index: number) => {
    if (index === targetPos) {
      return updatedTarget;
    } else {
      return value;
    }
  });

  return output;
}

export default function generalReducer(state = State, action: Action) {
  switch (action.type) {
    case "START_LOGIN":
      return { ...state, loginInProgress: true, loginFailed: false };
    case "LOGGED_IN":
      return { ...state, user: action.data, loginInProgress: false };
    case "LOGIN_FAILED":
      return { ...state, loginInProgress: false, loginFailed: true };
    case "LOGOUT":
      return { ...state, user: undefined };
    case "GET_BOOKS":
      return {
        ...state,
        books: [...action.data],
        booksLoaded: true,
        gettingBooks: false
      };
    case "START_GET_BOOKS":
      return { ...state, gettingBooks: true };
    case "SELECT_BOOK":
      return { ...state, selectedBook: action.data };
    case "NEW_BOOK":
      return { ...state, books: [...state.books, action.data] };
    case "NEW_AUDIO":
      var affectedBook = state.books.find(
        book => book.id === action.data.bookId
      );
      if (affectedBook !== undefined) {
        const newAudioArray = [...affectedBook.audio, ...action.data.data];
        const newBookList = updateIn(
          state.books,
          affectedBook,
          "audio",
          newAudioArray
        );
        return { ...state, books: newBookList };
      } else {
        return state;
      }
    case "UPDATE_AUDIO_PROGRESS":
      var audioOwner = state.books.find(
        book => book.id === action.data.audio.book_id
      );
      if (audioOwner !== undefined) {
        var affectedAudio = audioOwner.audio.find(
          audio => audio.id === action.data.audio.id
        );
        if (affectedAudio) {
          const newAudioArray = updateIn(
            audioOwner.audio,
            affectedAudio,
            "progress",
            action.data.progress
          );
          const newBookArray = updateIn(
            state.books,
            audioOwner,
            "audio",
            newAudioArray
          );
          return { ...state, books: newBookArray };
        } else {
          return state;
        }
      } else {
        return state;
      }
    default:
      return state;
  }
}
