import { useState } from 'react'

const Entry = ({entry}) => {
  return <div>{entry.name}</div>
}

const Phonebook = ({data}) => {
  let elements = data.map((entry) => {
    return <Entry key={entry.name} entry={entry}></Entry>
  })
  return (
    <div>
      {elements}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const updateInput = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let updatedPersons = [...persons, {name: newName}]
    setPersons(updatedPersons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={updateInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook data={persons}></Phonebook>
    </div>
  )
}

export default App
