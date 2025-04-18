import { useState } from 'react'

const Statistic = ({text, value, isPercentage = false}) => {
  return <p>{text}: {value}{isPercentage ? "%" : ""}</p>
}

const Statistics = ({stats}) => {
  let elements = Object.entries(stats).map((entry, i) => {
    let elem = null
    if (typeof(entry[1]) == "object") {
      elem = <Statistic
        key={i}
        text={entry[0]}
        value={entry[1].value}
        isPercentage={entry[1].isPercentage}
        ></Statistic>
    }
    else {
      elem = <Statistic
        key={i}
        text={entry[0]}
        value={entry[1]}
      ></Statistic>
    }
    return elem;
  })
  return elements;
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
  const statistics =  {
    Good: good,
    Neutral: neutral,
    Bad: bad,
    Total: total,
    Average: (good - bad) / total,
    Positive: {value: good / total * 100, isPercentage: true},
  }

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
        <Statistics stats={statistics}></Statistics>
      </div>
    </div>
  )
}

export default App