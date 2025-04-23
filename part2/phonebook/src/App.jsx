import { useState } from 'react'
import Phonebook from './Phonebook'
import PersonForm from './PersonForm'
import { factoryUpdate } from './factories'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={factoryUpdate(setFilter)}></Filter>
      <h3>Add a new contact</h3>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
      <Phonebook data={persons} filter={filter}></Phonebook>
    </div>
  )
}

export default App
