import axios, { AxiosInstance } from "axios"

export class BookService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api"
    })
  }

  getBooks(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get("/books")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  createBook(title: string, author: string, isStarred: boolean, isInLibrary: boolean, librarySection: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.post("/books", {
        "title": title,
        "author": author,
        "isStarred": isStarred,
        "libraryInfo": {
          "name": "Library",
          "isAvailable": isInLibrary,
          "section": librarySection
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  editBook(id: string, title: string, author: string, isStarred: boolean, isInLibrary: boolean, librarySection: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.put("/books/" + id, {
        "title": title,
        "author": author,
        "isStarred": isStarred,
        "libraryInfo": {
          "name": "Library",
          "isAvailable": isInLibrary,
          "section": librarySection
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  deletebook(id: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.delete("/books/" + id)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}
