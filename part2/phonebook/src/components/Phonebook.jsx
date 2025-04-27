const Entry = ({ entry }) => {
    return <div>{entry.name} {entry.number}</div>
}

const Phonebook = ({ data, filter }) => {
    const hasString = (name, query) => {
        return name.toLowerCase().includes(query.toLowerCase())
    }

    let elements = data.map((entry) => {
        let elem = null
        if (filter === '' || hasString(entry.name, filter)) {
            elem = <Entry key={entry.id} entry={entry}></Entry>
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