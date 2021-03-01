import MessageExternal from './components/message';
import Counter from './components/counter';

const Message = () => {
  return <h1>Hello word</h1>
}

const App = () => {

  const message = "hello word"
  const date = +new Date()

  return (
    <div className="App">
      { message + ' test in JSX'}
      <Message />
      {date}
      <MessageExternal color='green' message="This is a prop message" />

      <Counter />
    </div>
  );
}

export default App;
