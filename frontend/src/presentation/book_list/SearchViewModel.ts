import { BookManager } from "../../logic/BookManager";
import { computed, action } from "mobx"

export class SearchViewModel {
  private bookManager: BookManager

  constructor(bookManager: BookManager) {
    this.bookManager = bookManager
  }

  @computed get searchString() {
    return this.bookManager.searchString ?? ""
  }

  @computed get clearSearchButtonHidden() {
    return this.searchString.length <= 0
  }

  @action setSearchString(value: string) {
    this.bookManager.filterBySearchString(value)
  }

  @action clearSearchString() {
    this.bookManager.clearSearch()
  }
}