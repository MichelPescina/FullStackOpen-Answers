import { useState } from 'react'

const Entry = ({entry}) => {
  return <div>{entry.name} {entry.number}</div>
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
    { name: 'Arto Hellas', number: "123456789"}
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const factoryUpdate = (setState) => {
    return (event) => setState(event.target.value)
  }

  const hasName = (data, name) => data.some(
    (entry) => entry.name === name
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (hasName(persons, newName)) {
      alert(`${newName} is already added to phonebook.`)
    }
    else {
      let updatedPersons = [...persons, {name: newName, number: newNum}]
      setPersons(updatedPersons)
      setNewName('')
      setNewNum('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div> 
          Name: <input value={newName} onChange={factoryUpdate(setNewName)}/>
        </div>
        <div>
          Number:
          <input
            type="tel"
            value={newNum}
            onChange={factoryUpdate(setNewNum)}
          />
        </div>
        <div> <button type="submit">Add</button> </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook data={persons}></Phonebook>
    </div>
  )
}

export default App
