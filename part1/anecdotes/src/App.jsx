import { useState } from 'react'

const Anecdote = ({title, text, votes}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        {text} 
        <br></br>
        has {votes} votes
      </p>
    </div>
  )
}

const Button = ({text, clickHandler}) => {
  return <button onClick={clickHandler}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [currTopVal, setCurrTopVal] = useState(0)
  const [currTopId, setCurrTopId] = useState(0)

  const nextClickHdlr = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteClickHdlr = () => {
    let updated = [...votes]
    updated[selected]++
    if(updated[selected] >= currTopVal) {
      setCurrTopVal(updated[selected])
      setCurrTopId(selected)
    }
    setVotes(updated)
  }

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        text={anecdotes[selected]}
        votes={votes[selected]}
      ></Anecdote>
      <div>
        <Button text="Vote" clickHandler={voteClickHdlr}></Button>
        <Button text="Next anecdote" clickHandler={nextClickHdlr}></Button>
      </div>
      <Anecdote
        title="Anecdote with most votes"
        text={anecdotes[currTopId]}
        votes={votes[currTopId]}
      ></Anecdote>
    </div>
  )
}

export default App
