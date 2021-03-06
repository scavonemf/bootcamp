import axios from "axios"

export const getAllNotes = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      const { data } = response
      return data
    })
}

export const createNote = ({ title, body, userId }) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", { title, body, userId })
    .then(response => {
      const { data } = response
      return data
    })
}