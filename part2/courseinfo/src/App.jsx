import { Fragment } from 'react';

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

const Courses = ({courses}) => {
  let elements = courses.map((course) => {
    return (
      <Fragment key={course.id}>
        <Course course={course}></Course>
      </Fragment>
    )
  })
  return <div>{elements}</div>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App