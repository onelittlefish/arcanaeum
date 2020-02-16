import * as React from "react"
import { observer } from "mobx-react"

import { Filter } from "../../logic/BookManager"
import { FilterViewModel } from "./FilterViewModel"
import { ContainerAwareProps } from "../Container"

@observer
export class FilterView extends React.Component<ContainerAwareProps, {}> {
  private model: FilterViewModel

  constructor(props: ContainerAwareProps) {
    super(props)
    this.model = new FilterViewModel(props.container.bookManager, props.container.bookListUIManager)
  }

  private onClickFilter(filter: Filter, event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.setFilter(filter)
  }

  private onClickExpandAll(event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.expandAll()
  }

  private onClickCollapseAll(event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.collapseAll()
  }

  render() {
    return (
      <div id="actions">
        <div id="filters">
          <p>Show:
            <a href="#" id="all" className={this.model.getFilterClassName(Filter.All)} onClick={(event) => this.onClickFilter(Filter.All, event)}>All</a>
            <a href="#" id="starred" className={this.model.getFilterClassName(Filter.Starred)} onClick={(event) => this.onClickFilter(Filter.Starred, event)}>Starred</a>
            <a href="#" id="library" className={this.model.getFilterClassName(Filter.InLibrary)} onClick={(event) => this.onClickFilter(Filter.InLibrary, event)}>Library</a>
            <a href="#" id="not-library" className={this.model.getFilterClassName(Filter.NotInLibrary)} onClick={(event) => this.onClickFilter(Filter.NotInLibrary, event)}>Not in Library</a>
          </p>
        </div>

        <div id="expand-collapse">
          <a href="/api/books.csv">Download CSV</a>
          <a href="#" id="expand-all" onClick={(event) => this.onClickExpandAll(event)}>Expand All</a>
          <a href="#" id="collapse-all" onClick={(event) => this.onClickCollapseAll(event)}>Collapse All</a>
        </div>
      </div>
    )
  }
}