import { useEffect, useState } from 'react'

import { Note } from './components/note'
import Form from './components/form'
import { getAllNotes } from './service/serviceNotes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then(response => {
        setNotes(response)
        setLoading(false)
      })
  }, [])





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
      <Form notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
