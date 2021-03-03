import { Fragment, useState } from "react"

import { createNote } from '../service/serviceNotes'


const Form = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState('')

  const [error, setError] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: notes.length + 1
    }

    setNotes(notes.concat(noteToAddToState)) //for faster render

    setError('')
    createNote(noteToAddToState)
      .then(newNote =>
        setNotes([...notes, newNote])
      )
      .catch(error => {
        console.error(error)
        setError('The note could not be created')
      })

    setNewNote('')
  }

  return (
    <Fragment>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <form onSubmit={handleSubmit}>
        <input value={newNote} type="text" onChange={handleChange} />
        <button>Create note</button>
      </form>
    </Fragment>
  )
}

export default Form