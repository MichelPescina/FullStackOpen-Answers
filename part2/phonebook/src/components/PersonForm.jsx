import { useState } from 'react'
import { factoryUpdate, basicError} from './../factories'
import db from "./../services/phonebookDB"

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const hasName = (data, name) => data.some(
        (entry) => entry.name === name
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        if (hasName(persons, newName)) {
            const question = `${newName} is already added to phonebook. Do you want to replace the old number with a new one?`
            if(window.confirm(question)) {
                const id = persons.find(p => p.name === newName).id
                const newPerson = {id: id, name: newName, number: newNum }
                db.update(newPerson)
                    .then(data => {
                        const updatedPersons = persons.map(
                            (p) => p.name === newName ? newPerson : p
                        )
                        setPersons(updatedPersons)
                        setNewName('')
                        setNewNum('')
                    })
            }
        }
        else {
            const newPerson = { name: newName, number: newNum }
            db.create(newPerson)
                .then(data => {
                    const updatedPersons = [...persons, data]
                    setPersons(updatedPersons)
                    setNewName('')
                    setNewNum('')
                })
                .catch(basicError("Couldn't create the new entry in the server"))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input value={newName} onChange={factoryUpdate(setNewName)} />
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
    )
}

export default PersonForm