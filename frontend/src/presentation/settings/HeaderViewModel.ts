import { action } from "mobx"
import { SettingsUIManager } from "./SettingsUIManager";

export class HeaderViewModel {
  private settingsUIManager: SettingsUIManager

  constructor(settingsManager: SettingsUIManager) {
    this.settingsUIManager = settingsManager
  }

  @action toggleIsEditingSettings() {
    this.settingsUIManager.setIsEditingSettings(!this.settingsUIManager.isEditingSettings)
  }
}