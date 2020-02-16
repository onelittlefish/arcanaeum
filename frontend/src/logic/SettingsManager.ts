import { observable, action, computed } from "mobx"
import { UserService } from "../facades/UserService"

export class User {
  readonly id: string
  @observable librarySearchUrl: string

  constructor(id: string, librarySearchUrl: string) {
    this.id = id
    this.librarySearchUrl = librarySearchUrl
  }
}

export class SettingsManager {
  private userService: UserService

  @observable private currentUser: User

  constructor(userService: UserService) {
    this.userService = userService

    userService.getUser().then((data) => {
      this.currentUser = this.userFromData(data)
    })
  }

  @computed get librarySearchUrl() {
    return this.currentUser ? this.currentUser.librarySearchUrl : ""
  }
  
  private userFromData(data: unknown): User {
    const _data = data as any
    return new User(_data._id, _data.librarySearchUrl)
  }
  
  @action setLibrarySearchUrl(value: string) {
    this.userService.editUser(this.currentUser.id, value)
    .then((updatedUserData) => {
      const updatedUser = this.userFromData(updatedUserData)
      this.currentUser.librarySearchUrl = updatedUser.librarySearchUrl
    })
  }
}