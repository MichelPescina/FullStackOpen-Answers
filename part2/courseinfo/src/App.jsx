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
  var elements = course.parts.map((part) => {
    return (
      <Fragment key={part.id}>
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
      <strong>Total of {total} exercises.</strong>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App