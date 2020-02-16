import { BookManager, Book } from "../../logic/BookManager";
import { action, computed, observable, autorun } from "mobx"
import { BookListUIManager } from "../book_list/BookListUIManager";

export interface BookEditViewModelParent {
  onCancelEdit(): void
  onSaveEdit(): void
}

export class BookEditViewModel {
  private book: Book
  private parent: BookEditViewModelParent
  private bookManager: BookManager
  private bookListUIManager: BookListUIManager

  @observable title: string
  @observable author: string
  @observable private isStarred: boolean
  @observable isInLibraryChecked: boolean
  @observable librarySection: string

  constructor(book: Book, parent: BookEditViewModelParent, bookManager: BookManager, bookListUIManager: BookListUIManager) {
    this.book = book
    this.parent = parent
    this.bookManager = bookManager
    this.bookListUIManager = bookListUIManager

    this.loadProperties()

    if (this.book == null) {
      autorun(() => {
        this.title = this.bookListUIManager.newBookTitle
        this.author = this.bookListUIManager.newBookAuthor
      })
    }
  }
  
  private loadProperties() {
    this.title = this.book ? this.book.title : ""
    this.author = this.book ? this.book.author : ""
    this.isStarred = this.book && this.book.isStarred
    this.isInLibraryChecked = this.book && this.book.libraryInfo && this.book.libraryInfo.isAvailable
    this.librarySection = this.book && this.book.libraryInfo ? this.book.libraryInfo.section : ""
  }

  @computed get starClassName() {
    return this.isStarred ? "starred" : "unstarred"
  }

  @action toggleStarred() {
    this.isStarred = !this.isStarred
  }

  @action setTitle(value: string) {
    this.title = value
  }

  @action setAuthor(value: string) {
    this.author = value
  }

  @action setIsInLibraryChecked(value: boolean) {
    this.isInLibraryChecked = value
  }

  @action setLibrarySection(value: string) {
    this.librarySection = value
  }

  @action cancel() {
    this.clearData()

    if (this.parent) {
      this.parent.onCancelEdit()
    }
  }

  @action save() {
    if (this.book) {
      this.bookManager.editBook(this.book, this.title, this.author, this.isStarred, this.isInLibraryChecked, this.librarySection)
    } else {
      this.bookManager.createBook(this.title, this.author, this.isStarred, this.isInLibraryChecked, this.librarySection)
    }

    this.clearData()

    if (this.parent) {
      this.parent.onSaveEdit()
    }
  }
  
  private clearData() {
    this.loadProperties()
  }
}