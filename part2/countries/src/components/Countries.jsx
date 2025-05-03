const Country = ({ name, buttonHandler }) => {
    return (
            <tr>
                <td>{name}</td>
                <td>
                    <button onClick={() => buttonHandler(name)}>Show</button>
                </td>
            </tr>
        )
}

const Countries = ({ countries, buttonHandler }) => {
    if (!countries) {
        return null
    }
    let elements = countries.map((elem) => {
        return <Country key={elem} name={elem} buttonHandler={buttonHandler}></Country>
    })
    return (
        <table>
            <tbody>
                {elements}
            </tbody>
        </table>
    )
}

export default Countries