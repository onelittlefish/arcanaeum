import { BookManager, Filter } from "../../logic/BookManager";
import { action } from "mobx"
import { BookListUIManager } from "./BookListUIManager";

export class FilterViewModel {
  private bookManager: BookManager
  private bookListUIManager: BookListUIManager

  constructor(bookManager: BookManager, bookListUIManager: BookListUIManager) {
    this.bookManager = bookManager
    this.bookListUIManager = bookListUIManager
  }

  getFilterClassName(filter: Filter) {
    return (this.bookManager.filter == filter) ? "selected" : ""
  }

  @action setFilter(value: Filter) {
    this.bookManager.setFilter(value)
  }

  @action expandAll() {
    this.bookListUIManager.expandAll()
  }

  @action collapseAll() {
    this.bookListUIManager.collapseAll()
  }
}