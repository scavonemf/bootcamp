const bcrypt = require('bcrypt')
const User = require('../models/user')
const { api, getUsers } = require('./helpers')
const mongoose = require('mongoose')
const { server } = require('../index.js')

describe('Creating a new user' , () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ 
      username: 'flor',
      passwordHash
    })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const userAtStart = await getUsers()

    const newUser = {
      username: 'flori',
      name: 'florpiii',
      password: 'tuvieja1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(()=> {
  mongoose.connection.close()
  server.close()
})

