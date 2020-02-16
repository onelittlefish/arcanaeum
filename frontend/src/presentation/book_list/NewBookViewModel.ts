import { BookManager, Book } from "../../logic/BookManager";
import { BookEditViewModelParent } from "../book/BookEditViewModel";
import { computed } from "mobx";

export class NewBookViewModel implements BookEditViewModelParent {
  private bookManager: BookManager

  constructor(bookManager: BookManager) {
    this.bookManager = bookManager
  }
  
  @computed get isNewBookFormVisible() {
    return this.bookManager.searchString && this.bookManager.sortedBooks.length == 0
  }
  
  onCancelEdit() {
    this.bookManager.clearSearch()
  }
  
  onSaveEdit() {
    this.bookManager.clearSearch()
  }
}