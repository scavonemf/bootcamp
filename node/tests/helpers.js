const { app } = require('../index.js')
const supertest = require('supertest')

const api = supertest(app)

const initialNotes = [
  {
    content: 'hello',
    important: true,
    date: new Date()
  },
  {
    content: 'esto es una nota',
    important: true,
    date: new Date()
  }
]

const getAllContentFromNotes = async () => {
  const response =  await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

module.exports = {
  initialNotes, 
  getAllContentFromNotes, 
  api
}