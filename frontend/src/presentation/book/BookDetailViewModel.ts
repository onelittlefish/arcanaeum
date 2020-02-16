import { Book, BookManager } from "../../logic/BookManager";
import { observable, computed } from "mobx"

export interface BookEditViewModelParent {
  onCancelEdit(): void
  onSaveEdit(): void
}

export class BookDetailViewModel {
  private book: Book
  private bookManager: BookManager

  @observable amazonUrl: string
  @observable goodreadsUrl: string

  constructor(book: Book, bookManager: BookManager) {
    this.book = book
    this.bookManager = bookManager
    this.amazonUrl = book.amazonUrl
    this.goodreadsUrl = book.goodreadsUrl
  }

  @computed get libraryUrl() {
    return this.bookManager.getLibraryUrlForBook(this.book)
  }
}