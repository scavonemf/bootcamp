
const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

notesSchema.set('toJSON', { //delete elements for the note
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id //transform elements
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', notesSchema)

module.exports = Note

// Note.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'hello',
//   date: new Date(),

//   important: true
// })
// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.error(err)
//   })