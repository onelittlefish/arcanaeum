import { computed, action, observable, autorun } from "mobx"
import { SettingsUIManager } from "./SettingsUIManager";
import { SettingsManager } from "../../logic/SettingsManager";

export class SettingsViewModel {
  private settingsManager: SettingsManager
  private settingsUIManager: SettingsUIManager

  @observable librarySearchUrl: string

  constructor(settingsManager: SettingsManager, settingsUIManager: SettingsUIManager) {
    this.settingsManager = settingsManager
    this.settingsUIManager = settingsUIManager
    
    autorun(() => {
      this.loadProperties()
    })
  }

  private loadProperties() {
    this.librarySearchUrl = this.settingsManager.librarySearchUrl ?? ""
  }

  @computed get isSettingsFormVisible() {
    return this.settingsUIManager.isEditingSettings
  }

  @action setLibrarySearchUrl(value: string) {
    this.librarySearchUrl = value
  }

  @action cancel() {
    this.clearData()
    this.settingsUIManager.setIsEditingSettings(false)
  }
  
  @action save() {
    this.settingsManager.setLibrarySearchUrl(this.librarySearchUrl)
    this.settingsUIManager.setIsEditingSettings(false)
  }
  
  private clearData() {
    this.loadProperties()
  }
}