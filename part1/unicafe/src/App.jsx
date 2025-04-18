import { useState } from 'react'

const Statistic = ({text, value, isPercentage = false}) => {
  return <p>{text}: {value}{isPercentage ? "%" : ""}</p>
}

const Button = ({text, clickHandler}) => {
  return <button onClick={clickHandler}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  const goodClickHdlr = () => {setGood(good + 1);}
  const neutralClickHdlr = () => {setNeutral(neutral + 1);}
  const badClickHdlr = () => {setBad(bad + 1);}
  
  
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" clickHandler={goodClickHdlr}></Button>
        <Button text="Neutral" clickHandler={neutralClickHdlr}></Button>
        <Button text="Bad" clickHandler={badClickHdlr}></Button>
      </div>
      <h2>Statistics</h2>
      <div>
        <Statistic text="Good" value={good}></Statistic>
        <Statistic text="Neutral" value={neutral}></Statistic>
        <Statistic text="Bad" value={bad}></Statistic>
        <Statistic text="All" value={total}></Statistic>
        <Statistic text="Average" value={average}></Statistic>
        <Statistic text="Positive" value={positive} isPercentage={true}></Statistic>
      </div>
    </div>
  )
}

export default App