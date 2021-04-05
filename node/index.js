
require('dotenv').config()
require('./mongo') //conected de DB 

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/note') //import the note


app.use(cors())
app.use(express.json())

let notes = []


app.get('/', (request, response) => {
  response.send('<h1>hello world </h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  // response.send(id)
  const note = notes.find(note => note.id === id)


  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  console.log({ note })

})


app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  const newNote = new Note ({
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString()
  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  })

  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'not found'
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) //on visual studio
})
