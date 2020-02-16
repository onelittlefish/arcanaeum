import { observable, action, computed, toJS, autorun } from "mobx"
import { SettingsManager } from "./SettingsManager"
import { BookService } from "../facades/BookService"

export class LibraryInfo {
  @observable name: string
  @observable isAvailable = false
  @observable section: string

  constructor(name: string, isAvailable: boolean, section: string) {
    this.name = name
    this.isAvailable = isAvailable
    this.section = section
  }
}

export class Book {
  readonly id: string
  @observable title: string
  @observable author: string
  @observable isStarred = false
  @observable libraryInfo: LibraryInfo

  constructor(id: string, title: string, author: string, isStarred: boolean, isInLibrary: boolean, librarySection: string) {
    this.id = id
    this.title = title
    this.author = author
    this.isStarred = isStarred
    this.libraryInfo = new LibraryInfo(null, isInLibrary, librarySection)
  }

  @computed get urlSearchString() {
    const searchString = this.title + ' ' + this.author
    return encodeURIComponent(searchString)
  }

  @computed get amazonUrl() {
    return "http://www.amazon.com/s?field-keywords=" + this.urlSearchString
  }

  @computed get goodreadsUrl() {
    return "http://www.goodreads.com/search?query=" + this.urlSearchString
  }
}

export enum Filter {
  All, Starred, InLibrary, NotInLibrary
}

export class BookManager {
  private bookService: BookService
  private settingsManager: SettingsManager

  @observable books: Book[] = []
  @observable searchString: string
  @observable filter: Filter = Filter.All

  constructor(bookService: BookService, settingsManager: SettingsManager) {
    this.bookService = bookService
    this.settingsManager = settingsManager

    bookService.getBooks().then((data) => {
      if (data instanceof Array) {
        this.books = data.map((bookData) => {
          return this.bookFromData(bookData)
        })
      }
    })
  }
  
  private bookFromData(data: unknown): Book {
    const _data = data as any
    return new Book(_data._id, _data.title, _data.author, _data.isStarred, _data.libraryInfo.isAvailable, _data.libraryInfo.section)
  }
  
  private updateBookFromData(book: Book, data: unknown) {
    const _data = data as any
    book.title = _data.title
    book.author = _data.author
    book.isStarred = _data.isStarred
    book.libraryInfo.isAvailable = _data.libraryInfo.isAvailable
    book.libraryInfo.section = _data.libraryInfo.section
  }

  @action createBook(title: string, author: string, isStarred: boolean, isInLibrary: boolean, librarySection: string) {
    this.bookService.createBook(title, author, isStarred, isInLibrary, librarySection)
    .then((newBook) => {
      const book = this.bookFromData(newBook)
      this.books.push(book)
    })
  }

  @action editBook(book: Book, title: string, author: string, isStarred: boolean, isInLibrary: boolean, librarySection: string) {
    this.bookService.editBook(book.id, title, author, isStarred, isInLibrary, librarySection)
    .then((updatedBook) => {
      this.updateBookFromData(book, updatedBook)
    })
  }

  @action deleteBook(id: string) {
    this.bookService.deletebook(id)
    .then(() => {
      this.books = this.books.filter((book) => {
        return book.id != id
      })
    })
  }

  @action toggleIsStarred(book: Book) {
    book.isStarred = !book.isStarred
    
    this.bookService.editBook(book.id, book.title, book.author, book.isStarred, book.libraryInfo.isAvailable, book.libraryInfo.section)
    .then((updatedBook) => {
      this.updateBookFromData(book, updatedBook)
    })
    .catch((error) => {
      book.isStarred = !book.isStarred // revert change
    })
  }

  @action filterBySearchString(searchString: string) {
    this.searchString = searchString
  }

  @action clearSearch() {
    this.searchString = null
  }

  @action setFilter(value: Filter) {
    this.filter = value
  }

  private getSortString(book: Book) {
    if (book.author) {
      return book.author.toLocaleLowerCase().split(' ').pop()
    } else if (book.title) {
      return book.title.toLocaleLowerCase()
    } else {
      return ""
    }
  }

  @computed private get filtered() {
    switch (this.filter) {
      case Filter.All:
        return this.books.slice()
      case Filter.Starred:
        return this.books.filter((book) => book.isStarred)
      case Filter.InLibrary:
        return this.books.filter((book) => book.libraryInfo && book.libraryInfo.isAvailable)
      case Filter.NotInLibrary:
        return this.books.filter((book) => !book.libraryInfo || !book.libraryInfo.isAvailable)
    }
  }

  @computed private get searchFiltered() {
    if (this.searchString) {
        return this.filtered.filter((book) => {
          const substrRegex = new RegExp(this.searchString, 'i')
          return (book.title && substrRegex.test(book.title)) || (book.author && substrRegex.test(book.author))
      })
    } else {
      return this.filtered.slice()
    }
  }

  @computed get sortedBooks() {
    return this.searchFiltered.sort((book1, book2) => {
      return this.getSortString(book1).localeCompare(this.getSortString(book2))
    })
  }

  getLibraryUrlForBook(book: Book) {
    return this.settingsManager.librarySearchUrl ? this.settingsManager.librarySearchUrl.replace('<searchString>', book.urlSearchString) : null;
  }
}