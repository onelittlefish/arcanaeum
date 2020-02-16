import * as React from "react"
import { observer } from "mobx-react"

import { SearchViewModel } from "./SearchViewModel"
import { ContainerAwareProps } from "../Container"

@observer
export class SearchView extends React.Component<ContainerAwareProps, {}> {
  private model: SearchViewModel

  constructor(props: ContainerAwareProps) {
    super(props)
    this.model = new SearchViewModel(props.container.bookManager)
  }

  render() {
    return (
      <div id="search-filter">
        <form id="search">
          <div className="clearableInput">
            <input type="text" name="search" placeholder="Title or author..." value={this.model.searchString} onChange={(event) => this.model.setSearchString(event.target.value)} />
            <button type="reset" name="clear" hidden={this.model.clearSearchButtonHidden} onClick={(event) => { event.preventDefault(); this.model.clearSearchString() }}>X</button>
					</div>
				</form>
      </div>
    )
  }
}