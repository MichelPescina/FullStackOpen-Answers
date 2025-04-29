const Entry = ({ entry, deleteHandler}) => {
    return (
        <div>
            {entry.name} {entry.number}
            <button onClick={() => deleteHandler(entry)}>Delete</button>
        </div>)
}

const Phonebook = ({ data, filter, deleteHandler}) => {
    const hasString = (name, query) => {
        return name.toLowerCase().includes(query.toLowerCase())
    }

    let elements = data.map((entry) => {
        let elem = null
        if (filter === '' || hasString(entry.name, filter)) {
            elem = <Entry key={entry.id} entry={entry} deleteHandler={deleteHandler}></Entry>
        }
        return elem
    })
    return (
        <div>
            {elements}
        </div>
    )
}

export default Phonebook