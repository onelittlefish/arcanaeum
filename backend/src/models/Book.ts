import * as mongoose from "mongoose"

export type BookDocument = mongoose.Document & {
  title: string;
  author: string;
  isStarred: boolean;

  libraryInfo: {
    name: string;
    isAvailable: boolean;
    section: string;
  };
}

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isStarred: Boolean,

  libraryInfo: {
    name: String,
    isAvailable: Boolean,
    section: String
  }
}, { timestamps: true })

export const Book = mongoose.model<BookDocument>("Book", bookSchema)
