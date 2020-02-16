import SubscribableEvent from "subscribableevent";
import { computed } from "mobx";
import { BookManager } from "../../logic/BookManager";

export class BookListUIManagerEvents {
  readonly expandAll = new SubscribableEvent<() => void>()
  readonly collapseAll = new SubscribableEvent<() => void>()
}

export class BookListUIManager {
  private bookManager: BookManager

  readonly events = new BookListUIManagerEvents()

  constructor(bookManager: BookManager) {
    this.bookManager = bookManager
  }
  
  @computed get newBookTitle() {
    const searchString = (this.bookManager.searchString || "").split("-")
    return searchString[0].trim()
  }

  @computed get newBookAuthor() {
    const searchString = (this.bookManager.searchString || "").split("-")
    return  searchString.length > 1 ? searchString[1].trim() : ""
  }

  expandAll() {
    this.events.expandAll.fire()
  }

  collapseAll() {
    this.events.collapseAll.fire()
  }
}
