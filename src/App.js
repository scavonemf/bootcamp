import { useEffect, useState } from 'react'

import { Note } from './components/note'
import { getAllNotes, createNote } from './service/serviceNotes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then(response => {
        setNotes(response)
        setLoading(false)
      })
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
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



  if (!notes) {
    return 'not notes'
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      {loading ? 'Cargando...' : null}
      <ol>
        {notes
          .map(note =>
            <Note key={note.id} {...note} />
          )}
      </ol>

      {error && <span style={{ color: 'red' }}>{error}</span>}

      <form onSubmit={handleSubmit}>
        <input value={newNote} type="text" onChange={handleChange} />
        <button>Create note</button>
      </form>


    </div>
  );
}

export default App;
