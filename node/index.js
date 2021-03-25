// const http = require('http') //common js

// const { request, response } = require('express')
const { request, response } = require('express')
const express = require('express')

const logger = require('./loggerMiddleware')

const app = express()

app.use(express.json())

const notes = [
  {
    "id": 1,
    "content": "Hola como te va",
    "date": '2019-05-30t17:30:31.098Z',
    "important": true
  },
  {
    "id": 2,
    "content": "Hola como te va",
    "date": '2019-05-30t17:30:31.098Z',
    "important": false
  },
  {
    "id": 3,
    "content": "Hola como te va",
    "date": '2019-05-30t17:30:31.098Z',
    "important": true
  },
  {
    "id": 4,
    "content": "Hola como te va",
    "date": '2019-05-30t17:30:31.098Z',
    "important": false
  },
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-type': 'aplication/json' })
//   // response.end('Hello Word') on localhost:3001
//   response.end(JSON.stringify(notes))
// })

// app.use((request, response, next) => {
//   console.log(request.path)
//   console.log(request.body)
//   console.log(request.method)
//   console.log("------")
//   next()
// })


app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>hello world </h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
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
  // console.log(note)

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString()
  }

  // notes = [...notes, newNote]
  const notes = notes.concat(newNote)
  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'not found'
  })
})



const PORT = 3001 //the port have to be free
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) //on visual studio
})
