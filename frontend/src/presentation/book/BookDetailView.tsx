import * as React from "react"
import { observer } from "mobx-react"

import { BookDetailViewModel } from "./BookDetailViewModel"
import { ContainerAwareProps } from "../Container"
import { Book } from "../../logic/BookManager"

interface Props extends ContainerAwareProps {
  book: Book
}

@observer
export class BookDetailView extends React.Component<Props, {}> {
  private model: BookDetailViewModel

  constructor(props: Props) {
    super(props)
    this.model = new BookDetailViewModel(props.book, props.container.bookManager)
  }

  render() {
    return (
      <div onClick={(event) => event.stopPropagation()/* Don't trigger expand/collapse on row */}>
        <a href={this.model.amazonUrl} target="_blank">Amazon</a> |  <a href={this.model.goodreadsUrl} target="_blank">Goodreads</a> |  <a href={this.model.libraryUrl} target="_blank" className="library">Library</a>
      </div>
    )
  }
}