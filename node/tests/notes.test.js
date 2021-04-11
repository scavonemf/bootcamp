const mongoose = require('mongoose')

const {server} = require('../index.js')

const Note = require ('../models/note')

const {initialNotes, getAllContentFromNotes, api} = require('./helpers') 

beforeEach(async () => {
  await Note.deleteMany({})

  //parallel (no tenemos control del order)
  // const notesObjects = initialNotes.map(notes => new Note(notes))
  // const promises = notesObjects.map(note => note.save())
  // await Promise.all(promises)

  //sequential (order de los initial notes es el mismo)
  for (const note of initialNotes) {
    const notesObjects = new Note(note)
    await notesObjects.save()
  }

  // const note1 = new Note(initialNotes[0])
  // await note1.save()
  // const note2 = new Note(initialNotes[1])
  // await note2.save()
})

describe('GET a note', () => {
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
})

describe('POST a note', () => {
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
  
  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  
    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE a note', () => {
  test('a note can be deleted', async () => {
    const { response : firstResponse } = await getAllContentFromNotes()
    const { body: notes } = firstResponse
    const noteToDelete = notes[0]
  
    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)
  
      const {contents, response: secondResponse } = await getAllContentFromNotes()
      expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
      expect(contents).not.toContain(noteToDelete.content)
  })
  
  test('a note that do not exist can not be deleted', async () => {
  
    await api
      .delete('/api/notes/1234')
      .expect(400)
  
      const {response } = await getAllContentFromNotes()
      expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(()=> {
  mongoose.connection.close()
  server.close()
})