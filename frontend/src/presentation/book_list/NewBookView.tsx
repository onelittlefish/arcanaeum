import * as React from "react"
import { observer } from "mobx-react"

import { NewBookViewModel } from "./NewBookViewModel"
import { BookEditView } from "../book/BookEditView"
import { ContainerAwareProps } from "../Container"

@observer
export class NewBookView extends React.Component<ContainerAwareProps, {}> {
  private model: NewBookViewModel

  constructor(props: ContainerAwareProps) {
    super(props)
    this.model = new NewBookViewModel(props.container.bookManager)
  }

  render() {
    return (
      <div id="add">
        {this.model.isNewBookFormVisible ? (<BookEditView book={null} modelParent={this.model} container={this.props.container} />) : (null)}
      </div>
    )
  }
}