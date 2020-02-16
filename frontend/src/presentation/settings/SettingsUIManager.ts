import { observable, action } from "mobx"

export class SettingsUIManager {
  @observable isEditingSettings = false

  @action setIsEditingSettings(value: boolean) {
    this.isEditingSettings = value
  }
}