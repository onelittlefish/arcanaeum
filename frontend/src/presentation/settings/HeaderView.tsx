import * as React from "react"
import { observer } from "mobx-react"

import { HeaderViewModel } from "./HeaderViewModel"
import { ContainerAwareProps } from "../Container"

@observer
export class HeaderView extends React.Component<ContainerAwareProps, {}> {
  private model: HeaderViewModel

  constructor(props: ContainerAwareProps) {
    super(props)
    this.model = new HeaderViewModel(props.container.settingsUIManager)
  }

  private onClickSettings(event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.toggleIsEditingSettings()
  }

  render() {
    return (
      <div id="logout">
        <a href="#" id="settings-link" onClick={(event) => this.onClickSettings(event)}>Settings</a> | <a href="/logout">Log Out</a>
      </div>
    )
  }
}