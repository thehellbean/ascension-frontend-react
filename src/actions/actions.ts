import { User } from "../store/initialState";
import { Book } from "../types/book";
import { Audio } from "../types/audio";

interface LOGGED_IN {
  type: "LOGGED_IN";
  data: User;
}

interface START_LOGIN {
  type: "START_LOGIN";
}

interface LOGIN_FAILED {
  type: "LOGIN_FAILED";
}

interface LOGOUT {
  type: "LOGOUT";
}

interface GET_BOOKS {
  type: "GET_BOOKS";
  data: Book[];
}

interface START_GET_BOOKS {
  type: "START_GET_BOOKS";
}

interface SELECT_BOOK {
  type: "SELECT_BOOK";
  data: Book;
}

interface NEW_AUDIO {
  type: "NEW_AUDIO";
  data: {
    bookId: number;
    data: Audio[];
  };
}

interface NEW_BOOK {
  type: "NEW_BOOK";
  data: Book;
}

interface UPDATE_AUDIO_PROGRESS {
  type: "UPDATE_AUDIO_PROGRESS";
  data: {
    audio: Audio;
    progress: number;
  };
}

export type Action =
  | LOGGED_IN
  | START_LOGIN
  | LOGIN_FAILED
  | LOGOUT
  | GET_BOOKS
  | START_GET_BOOKS
  | SELECT_BOOK
  | NEW_AUDIO
  | NEW_BOOK
  | UPDATE_AUDIO_PROGRESS;
