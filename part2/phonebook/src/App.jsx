import { useState, useEffect} from 'react'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { factoryUpdate, basicError} from './factories'
import db from "./services/phonebookDB"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    db.getAll("http://localhost:3001/persons")
      .then(data => {setPersons(data)})
      .catch(basicError("An error has ocurred, the application couldn't connect to the server"))
  }, [])

  const deleteHandler = (entry) => {
    if (window.confirm(`Do you want to delete ${entry.name}?`)) {
      db.eliminate(entry.id)
        .then((data) => {
          setPersons(persons.filter((person) => person.id != entry.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={factoryUpdate(setFilter)}></Filter>
      <h3>Add a new contact</h3>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
      <Phonebook data={persons} filter={filter} deleteHandler={deleteHandler}></Phonebook>
    </div>
  )
}

export default App
