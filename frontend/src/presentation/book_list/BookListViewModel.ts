import { BookManager, Book } from "../../logic/BookManager";
import { computed } from "mobx"
import { BookListUIManager } from "./BookListUIManager";

export class BookListViewModel {
  private bookManager: BookManager
  private bookListUIManager: BookListUIManager

  constructor(bookManager: BookManager, bookListUIManager: BookListUIManager) {
    this.bookManager = bookManager
    this.bookListUIManager = bookListUIManager
  }

  @computed get books(): [Book, string][] {
    return this.bookManager.sortedBooks.map((book) => {
      return [book, book.id]
    })
  }
}