import { Book } from "../types/book";

export function selectBook(book: Book) {
  return {
    type: "SELECT_BOOK",
    data: book
  };
}
