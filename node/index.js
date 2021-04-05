
require('dotenv').config()
require('./mongo') //conected de DB 

const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const Note = require('./models/note') //import the note

app.use(cors())
app.use(express.json())


app.get('/', (request, response) => {
  response.send('<h1>hello world </h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {

  const { id } = request.params

  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(err => {
    next(err)
  })
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

app.put('/api/notes/:id', (request, response, next) => {
  const note = request.body
  const {id} = request.params

  const newNoteData = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteData, {new: true})
    .then(result => {
      response.json(result)
    })
    .catch(err => {
      next(err)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(err => {
    next(err)
  })
})


//middlewares
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) //on visual studio
})
