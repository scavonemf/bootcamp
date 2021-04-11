const mongoose = require('mongoose')

const {server} = require('../index.js')

const Note = require ('../models/note')

const {initialNotes, getAllContentFromNotes, api} = require('./helpers') 

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()
  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const { response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the frist note is about hello', async () => {
  const { response } = await getAllContentFromNotes()
  expect(response.body[0].content).toBe('hello')
})

test('a note is about hello', async () => {
  const {contents} = await getAllContentFromNotes()
  expect(contents).toContain('hello')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'this is a POST',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

afterAll(()=> {
  mongoose.connection.close()
  server.close()
})