
const {Schema , model} = require('mongoose')

const UserSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note' //al otro model 
  }]
})

userSchema.set('toJSON', { //delete elements for the note
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id //transform elements
    delete returnedObject._id
    delete returnedObject.__v

    //que no devuelva el passaword
    delete returnedObject.passwordHash
  }
})

const User = model('User', UserSchema)

module.exports = User