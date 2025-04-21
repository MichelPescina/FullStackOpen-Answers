import { Fragment } from 'react'

const Header = ({course}) => {
  return (
    <>
      <h2>{course.name}</h2>
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

export default Course