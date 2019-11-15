import { Book } from "../types/book";
import { MediaState } from "./mediaState";

export interface User {
  id: number;
  username: string;
}

export interface GeneralState {
  user?: User;
  loginInProgress: boolean;
  loginFailed: boolean;
  books: Book[];
  gettingBooks: boolean;
  booksLoaded: boolean;
  selectedBook?: Book;
}

export interface AppState {
  media: MediaState;
  general: GeneralState;
}

export const State: GeneralState = {
  user: undefined,
  loginInProgress: false,
  loginFailed: false,
  books: [],
  gettingBooks: false,
  booksLoaded: false,
  selectedBook: undefined
};
