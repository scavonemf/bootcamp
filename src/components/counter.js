import { useState } from "react";

const DisplayCounter = ({ counter }) => {
  console.log('counter render')
  return <h1>{counter}</h1>
}

const Counter = (props) => {

  const initialValue = 0

  const [counter, setCounter] = useState(initialValue)

  const handleClick = () => {
    setCounter(counter + 1)
  }

  const handleReset = () => {
    setCounter(initialValue)
  }

  const isEven = counter % 2 === 0

  const evenMessage = isEven ? 'is even' : 'not is even'

  return (
    <div>
      <p>
        The initial value of the counter is :
      </p>
      {/* <h1>{counter}</h1> */}
      <DisplayCounter counter={counter} />
      <p>{evenMessage}</p>
      <button onClick={handleClick}>increment</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
}

export default Counter