import * as React from "react"
import { observer } from "mobx-react"

import { BookListViewModel } from "./BookListViewModel"
import { BookView } from "../book/BookView"
import { ContainerAwareProps } from "../Container"

@observer
export class BookListView extends React.Component<ContainerAwareProps, {}> {
  private model: BookListViewModel

  constructor(props: ContainerAwareProps) {
    super(props)
    this.model = new BookListViewModel(props.container.bookManager, props.container.bookListUIManager)
  }

  render() {
    const bookViews = this.model.books.map((bookAndIndex) => {
      return <BookView book={bookAndIndex[0]} index={bookAndIndex[1]} key={bookAndIndex[1]} container={this.props.container} />
    })

    return (
      <div id="book-list">
        {bookViews}
      </div>
    )
  }
}