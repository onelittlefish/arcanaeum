import { Book, BookDocument } from "../models/Book";

export class BookService {
  booksAsCsv(onLoaded: (err: any, csv: string) => void) {
    Book.find((err, books) => {
      if (err) {
        console.log("error: " + err);
        onLoaded(err, null);
      }
  
      const csv = this.csvForBooks(books);
      onLoaded(null, csv);
    });
  }

  private csvForBooks(books: BookDocument[]) {
    return "title,author,library,section,starred\r\n" +
        books.map((book) => {
          return [
            this._escapeCsvString(book.title),
            this._escapeCsvString(book.author),
            this._escapeCsvString(book.libraryInfo.isAvailable ? "yes" : "no"),
            this._escapeCsvString(book.libraryInfo.section),
            this._escapeCsvString(book.isStarred ? "yes" : "no")
          ].join(",");
        }).join("\r\n");
  }

  private _escapeCsvString(str: string){
    return `"${str.replace(/"/g, "\"\"")}"`;
  }
}
