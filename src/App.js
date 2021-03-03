import { useState } from 'react'
import { Note } from './components/note'



const App = (props) => {

  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    // setNotes(notes.concat(noteToAddToState))
    setNotes([...notes, noteToAddToState])
    setNewNote('')
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  // if (!notes) {
  //   return 'not notes'
  // }

  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        {showAll ? "Show only important" : "Show All"}
      </button>
      <ol>
        {notes
          .map(note =>
            <Note key={note.id} content={note.content} date={note.date} />
          )}
      </ol>

      <form onSubmit={handleSubmit}>
        <input value={newNote} type="text" onChange={handleChange} />
        <button>Create note</button>
      </form>
    </div>
  );
}

export default App;
