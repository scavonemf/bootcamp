const http = require('http') //common js

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': 'aplication/json' })
  // response.end('Hello Word') on localhost:3001
  response.end(JSON.stringify(notes))
})

const PORT = 3001 //the port have to be free
app.listen(PORT)
console.log(`Server running on port ${PORT}`) //on visual studio