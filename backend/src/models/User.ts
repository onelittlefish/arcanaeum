import * as mongoose from "mongoose"

export type UserDocument = mongoose.Document & {
  email: string;
  librarySearchUrl: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  librarySearchUrl: String
}, { timestamps: true })

export const User = mongoose.model<UserDocument>("User", userSchema)
