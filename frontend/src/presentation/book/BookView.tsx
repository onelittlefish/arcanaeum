import * as React from "react"
import { observer } from "mobx-react"

import { BookViewModel } from "./BookViewModel"
import { BookEditView } from "./BookEditView"
import { BookDetailView } from "./BookDetailView"
import { Book } from "../../logic/BookManager"
import { ContainerAwareProps } from "../Container"

interface Props extends ContainerAwareProps {
  book: Book
  index: number
}

@observer
export class BookView extends React.Component<Props, {}> {
  private model: BookViewModel

  constructor(props: Props) {
    super(props)
    this.model = new BookViewModel(props.book, props.index, props.container.bookManager, props.container.bookListUIManager)
  }

  private onClickStar(event: React.SyntheticEvent<any, any>) {
    event.stopPropagation()
    this.model.onClickStar()
  }

  private onClickRow(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.model.onClickRow()
  }

  private onEdit(event: React.SyntheticEvent<any, any>) {
    event.stopPropagation()
    this.model.edit()
  }

  private onDelete(event: React.SyntheticEvent<any, any>) {
    event.stopPropagation()
    this.model.delete()
  }

  render() {
    return (
      <div className={this.model.className} onClick={(event) => this.onClickRow(event) }>
        <div className="star"><a href="#" className={this.model.starClassName} onClick={(event) => this.onClickStar(event)}></a></div>
        <div className="title">{this.model.title}</div>
        <div className="author">{this.model.author}</div>
        <div className="inLibrary"><span className={this.model.isInLibraryClassName}></span></div>
        <div className="librarySection">{this.model.librarySection}</div>
        <div className="modify"><a href="#" className="edit" onClick={(event) => this.onEdit(event) }>edit</a> | <a href="#" className="delete" onClick={(event) => this.onDelete(event) }>delete</a></div>
        <div className="editView">
          {this.model.isEditing ? (<BookEditView book={this.props.book} modelParent={this.model} container={this.props.container} />) : (null)}
        </div>
        <div className="expanded">
          {this.model.isExpanded ? (<BookDetailView book={this.props.book} container={this.props.container} />) : (null)}
        </div>
      </div>
    )
  }
}