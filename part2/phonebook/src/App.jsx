import { useState } from 'react'

const Entry = ({entry}) => {
  return <div>{entry.name} {entry.number}</div>
}

const Phonebook = ({data, filter}) => {
  const hasString = (name, query) => {
    return name.toLowerCase().includes(query.toLowerCase())
  }

  let elements = data.map((entry) => {
    let elem = null
    if (filter === '' || hasString(entry.name, filter)) {
      elem = <Entry key={entry.name} entry={entry}></Entry>
    }
    return elem
  })
  return (
    <div>
      {elements}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

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
      <div>
        <div>
          Only show contacts with:
          <input type='text' onChange={factoryUpdate(setFilter)}/>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new contact</h3>
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
      <h3>Numbers</h3>
      <Phonebook data={persons} filter={filter}></Phonebook>
    </div>
  )
}

export default App
