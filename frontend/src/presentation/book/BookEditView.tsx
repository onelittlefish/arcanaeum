import * as React from "react"
import { observer } from "mobx-react"

import { BookEditViewModel, BookEditViewModelParent } from "./BookEditViewModel"
import { Book } from "../../logic/BookManager"
import { ContainerAwareProps } from "../Container"

interface Props extends ContainerAwareProps {
  book: Book
  modelParent: BookEditViewModelParent
}

@observer
export class BookEditView extends React.Component<Props, {}> {
  private model: BookEditViewModel

  constructor(props: Props) {
    super(props)
    this.model = new BookEditViewModel(props.book, props.modelParent, props.container.bookManager, props.container.bookListUIManager)
  }

  private onClickStar(event: React.SyntheticEvent<any, any>) {
    event.preventDefault()
    this.model.toggleStarred()
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
      <form onSubmit={(event) => this.onSubmit(event) } onClick={(event) => event.stopPropagation()}>
			    <fieldset>
			    	<button className={this.model.starClassName} onClick={(event) => this.onClickStar(event)}></button>
            <input type="text" name="title" className="title" placeholder="Title" value={this.model.title} onChange={(event) => this.model.setTitle(event.target.value)} />
            <input type="text" name="author" className="author" placeholder="Author" value={this.model.author} onChange={(event) => this.model.setAuthor(event.target.value)} />
            <input type="checkbox" name="isAvailable" className="inLibrary" checked={this.model.isInLibraryChecked || false} onChange={(event) => { this.model.setIsInLibraryChecked(event.target.checked) }} />
            <input type="text" name="section" className="librarySection" placeholder="Section" value={this.model.librarySection} onChange={(event) => this.model.setLibrarySection(event.target.value)} />
            <button className="cancel" onClick={(event) => this.onCancel(event) }>cancel</button>
            <button type="submit" className="submit">save</button>
			    </fieldset>
			</form>
    )
  }
}