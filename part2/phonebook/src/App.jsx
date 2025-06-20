import { useState, useEffect} from 'react'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { factoryUpdate, basicError} from './factories'
import db from "./services/phonebookDB"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const successHandler = (message) => {
    setSuccessMsg(message)
    setTimeout(() => {
      setSuccessMsg(null) 
    }, 5000)
  }
  
  const errorHandler = (error, message) => {
    setErrorMsg(message)
    console.log(error)
    setTimeout(() => {
      setErrorMsg(null)  
    }, 5000)
  }

  const loadData = () => {
    db.getAll()
      .then(data => {setPersons(data)})
      .catch((error) => errorHandler(
        error.message,
        error.response.data.error
      ))
  }

  useEffect(() => {
    loadData()
  }, [])

  const createHandler = (newPerson) => {
    db.create(newPerson)
      .then(data => {
        const updatedPersons = [...persons, data]
        setPersons(updatedPersons)
        successHandler(`Added ${newPerson.name}`)
      })
      .catch((error) => {
        loadData()
        errorHandler(
          error.message,
          error.response.data.error
        )
      })
  }

  const updateHandler = (newPerson) => {
    const question = `${newPerson.name} has already been added to phonebook. Do you want to replace the old number with a new one?`
    if(window.confirm(question)) {
      const id = persons.find(p => p.name === newPerson.name).id
      db.update({...newPerson, id})
        .then(data => {
            const updatedPersons = persons.map(
                (p) => p.name === newPerson.name ? {...newPerson, id} : p
            )
            setPersons(updatedPersons)
            successHandler(`Updated phone number of ${newPerson.name}`)
        })
        .catch((error) => {
          loadData()
          errorHandler(
            error.message,
            error.response.data.error
          )
        })
    }
  }

  const deleteHandler = (entry) => {
    if (window.confirm(`Do you want to delete ${entry.name}?`)) {
      setPersons(persons.filter((person) => person.id != entry.id))
      db.eliminate(entry.id)
        .then((data) => {
          successHandler(`Deleted ${entry.name}`)
        })
        .catch((error) => {
          loadData()
          errorHandler(
            error.message,
            error.response.data.error
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={successMsg} isError={false}/>
      <Notification text={errorMsg} isError={true}/>
      <Filter onChange={factoryUpdate(setFilter)}></Filter>
      <h3>Add a new contact</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        createHandler={createHandler}
        updateHandler={updateHandler}
      ></PersonForm>
      <h3>Numbers</h3>
      <Phonebook data={persons} filter={filter} deleteHandler={deleteHandler}></Phonebook>
    </div>
  )
}

export default App
