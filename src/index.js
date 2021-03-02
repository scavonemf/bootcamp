
import ReactDOM from 'react-dom';

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2020-05-30T19:20:12.209Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2020-05-30T19:20:12.209Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods',
    date: '2020-05-30T19:20:12.209Z',
    important: true,
  }
]

const rootElement = document.getElementById('root')


ReactDOM.render(<App notes={notes} />, rootElement);

