import MessageExternal from './message';
import Counter from './counter';
import NewCounter from './newCounter';

const Message = () => {
  return <h1>Hello word</h1>
}

const TestApp = () => {

  const message = "hello word"
  const date = +new Date()

  return (
    <div className="App">
      { message + ' test in JSX'}
      <Message />
      {date}
      <MessageExternal color='green' message="This is a prop message" />

      <Counter />
      <br />
      <NewCounter />
    </div>
  );
}

export default TestApp;