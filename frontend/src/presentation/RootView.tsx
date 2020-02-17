import * as React from 'react'
import { BookListView } from './book_list/BookListView'
import { BookManager } from '../logic/BookManager'
import { NewBookView } from './book_list/NewBookView'
import { SearchView } from './book_list/SearchView'
import { FilterView } from './book_list/FilterView'
import { BookListUIManager } from './book_list/BookListUIManager'
import { SettingsManager } from '../logic/SettingsManager'
import { SettingsUIManager } from './settings/SettingsUIManager'
import { HeaderView } from './settings/HeaderView'
import { SettingsView } from './settings/SettingsView'
import { ContainerAwareProps } from './Container'

export class RootView extends React.Component<ContainerAwareProps, {}> {
  render() {
    return (
      <div id="content">
        <HeaderView container={this.props.container} />

        <h1>Arcanaeum</h1>

        <SettingsView container={this.props.container} />

        <SearchView container={this.props.container} />
        <FilterView container={this.props.container} />

        <div className="books">
		    	<div className="header-row">
		    		<div className="star"></div>
		    		<div className="title">Title</div>
		    		<div className="author">Author</div>
		    		<div className="inLibrary">@ Library</div>
		    		<div className="librarySection">Section</div>
		    		<div className="modify"></div>
		    	</div>
          <NewBookView container={this.props.container} />
          <BookListView container={this.props.container} />
        </div>
      </div>
    )
  }
}