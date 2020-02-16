import { Book, BookManager } from "../../logic/BookManager";
import { computed, observable, action } from "mobx"
import { BookEditViewModelParent } from "./BookEditViewModel";
import { BookListUIManager } from "../book_list/BookListUIManager";

export class BookViewModel implements BookEditViewModelParent {
  readonly book: Book

  readonly bookManager: BookManager
  private bookListUIManager: BookListUIManager

  @observable isEditing = false
  @observable isExpanded = false

  constructor(book: Book, bookManager: BookManager, bookListUIManager: BookListUIManager) {
    this.book = book

    this.bookManager = bookManager
    this.bookListUIManager = bookListUIManager

    this.bookListUIManager.events.expandAll.subscribe(() => {
      this.isExpanded = true
    })
    this.bookListUIManager.events.collapseAll.subscribe(() => {
      this.isExpanded = false
    })
  }
  
  @computed get id() {
    return this.book.id
  }

  @computed get starClassName() {
    return this.book.isStarred ? "starred" : "unstarred"
  }

  @computed get title() {
    return this.book.title
  }

  @computed get author() {
    return this.book.author
  }

  @computed get isInLibraryClassName() {
    if (this.book.libraryInfo) {
      return this.book.libraryInfo.isAvailable ? "checkmark" : ""
    } else {
      return ""
    }
  }

  @computed get librarySection() {
    if (this.book.libraryInfo) {
      return this.book.libraryInfo.section
    } else {
      return ""
    }
  }

  @action onClickStar() {
    this.bookManager.toggleIsStarred(this.book)
  }

  @action onClickRow() {
    this.isExpanded = !this.isExpanded
  }

  @action edit() {
    this.isEditing = true
  }

  @action delete() {
    this.bookManager.deleteBook(this.book.id)
  }

  @action onCancelEdit() {
    this.isEditing = false
  }

  @action onSaveEdit() {
    this.isEditing = false
  }
}