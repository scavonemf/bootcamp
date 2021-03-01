import { useState } from "react";

const WarningNotUsed = () => {
  return <p>Counter not used yet</p>
}

const CounterList = ({ clicks }) => {
  return <p>{clicks.join(', ')}</p>
}


const NewCounter = () => {

  // const [left, setLeft] = useState(10)
  // const [right, setRight] = useState(20)

  // const INITIAL_STATE = {
  //   left: 0,
  //   right: 0
  // }

  // const [counters, setCounters] = useState({
  //   INITIAL_STATE
  // })

  const [clicks, setClicks] = useState([])

  //USE UNIQUE STATE FOR LEFT AND RIGHT 

  const left = clicks.filter(click => click === 'L')
  const right = clicks.filter(click => click === 'R')

  const handleClickLeft = () => {

    // const newCountersState = {
    //   ...counters,
    //   left: counters.left + 1,
    // }
    // setCounters(newCountersState)

    setClicks(prevClicks => ([...prevClicks, 'L']))
  }

  const handleClickRight = () => {
    // setCounters({
    //   left: counters.left,
    //   right: counters.right + 1
    // })
    setClicks(prevClicks => ([...prevClicks, 'R']))
  }

  return (
    <div>
      {/* {counters.left} */}

      {left.length}
      {/* <button onClick={() => setLeft(left + 1)}>left</button>
      <button onClick={() => setRight(right + 1)}>right</button> */}
      <button onClick={handleClickLeft}>left</button>
      <button onClick={handleClickRight}>right</button>
      {/* {counters.right} */}
      {right.length}
      <br />

      <p>clicks totales : {clicks.length}</p>

      {clicks.length === 0 ?
        <WarningNotUsed />
        :
        <CounterList clicks={clicks} />
      }
    </div>
  );
}

export default NewCounter