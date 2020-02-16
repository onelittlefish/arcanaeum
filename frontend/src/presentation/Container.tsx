import { BookService } from '../facades/BookService';
import { UserService } from '../facades/UserService';
import { SettingsManager } from "../logic/SettingsManager"
import { BookManager } from "../logic/BookManager"
import { BookListUIManager } from "./book_list/BookListUIManager"
import { SettingsUIManager } from './settings/SettingsUIManager';

export class Container {
  readonly userService: UserService
  readonly bookService: BookService

  readonly settingsManager: SettingsManager
  readonly settingsUIManager: SettingsUIManager
  readonly bookManager: BookManager
  readonly bookListUIManager: BookListUIManager

  constructor() {
    this.userService = new UserService()
    this.bookService = new BookService()

    this.settingsManager = new SettingsManager(this.userService)
    this.settingsUIManager = new SettingsUIManager()
    this.bookManager = new BookManager(this.bookService, this.settingsManager)
    this.bookListUIManager = new BookListUIManager(this.bookManager)
  }
}

export interface ContainerAwareProps {
  container: Container
}