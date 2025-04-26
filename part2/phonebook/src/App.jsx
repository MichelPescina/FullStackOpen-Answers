import { useState, useEffect} from 'react'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { factoryUpdate } from './factories'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(
      (request) => {
        setPersons(request.data)
      },
      (error) => {
        console.log(error)
        alert("An error has ocurred, the application couldn't connect to the server")
      }
    )
  }, [])

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
