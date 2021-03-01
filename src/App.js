import MessageExternal from './components/message';

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
    </div>
  );
}

export default App;
