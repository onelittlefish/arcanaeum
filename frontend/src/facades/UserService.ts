import axios, { AxiosInstance } from "axios"

export class UserService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api"
    })
  }

  getUser(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get("/users")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  editUser(id: string, librarySearchUrl: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.put("/users/" + id, {
        "librarySearchUrl": librarySearchUrl
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}
