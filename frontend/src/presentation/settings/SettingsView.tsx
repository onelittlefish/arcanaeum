import * as React from "react"
import { observer } from "mobx-react"

import { SettingsViewModel } from "./SettingsViewModel"
import { ContainerAwareProps } from "../Container"

@observer
export class SettingsView extends React.Component<ContainerAwareProps, {}> {
  private model: SettingsViewModel

  constructor(props: ContainerAwareProps) {
    super(props)
    this.model = new SettingsViewModel(props.container.settingsManager, props.container.settingsUIManager)
  }

  private onSubmit(event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.save()
  }

  private onCancel(event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.cancel()
  }

  render() {
    return (
      <div>
        {this.model.isSettingsFormVisible ? (
          <div id="settings">
            <form onSubmit={(event) => this.onSubmit(event)}>
              <fieldset>
                <label>
                  Library Search URL
                  <input type="text" name="librarySearchUrl" placeholder="Use <searchString> as placeholder" value={this.model.librarySearchUrl} autoComplete="off" onChange={(event) => this.model.setLibrarySearchUrl(event.target.value)} />
                </label>
                <button className="cancel" onClick={(event) => this.onCancel(event)}>cancel</button>
                <button type="submit" className="submit">save</button>
              </fieldset>
            </form>
          </div>
        ) : (null)}
      </div>
    )
  }
}