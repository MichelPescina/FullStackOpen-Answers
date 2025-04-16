import { Fragment } from 'react';

const Header = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Part = ({name, exercises}) => {
  return (<p> {name} {exercises} </p>)
}

const Content = ({course}) => {
  var elements = course.parts.map((part, i) => {
    return (
      <Fragment key={i}>
        <Part name={part.name} exercises={part.exercises}/>
      </Fragment>
    )
  })
  return (
    <>
      {elements}
    </>
  )
}

const Total = ({course}) => {
  let total = course.parts.reduce(
    (accum, curr) => accum + curr.exercises,
    0,
  )
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App