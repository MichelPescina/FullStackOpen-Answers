import { useState } from 'react'
import { factoryUpdate } from './../factories'

const PersonForm = ({ persons, createHandler, updateHandler}) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const hasName = (data, name) => data.some(
        (entry) => entry.name === name
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        if (hasName(persons, newName)) {
            updateHandler({name: newName, number: newNum})
            setNewName('')
            setNewNum('')
        }
        else {
            createHandler({ name: newName, number: newNum })
            setNewName('')
            setNewNum('')
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