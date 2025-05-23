const express = require("express")
const app = express()

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/info", (req, res) => {
    const date = Date()
    const person = persons.length > 1? "persons" : "person"
    res.send(`Phonebook has info for ${persons.length} ${person} <br> ${date}`)
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find(val => val.id === req.params.id)
    if (person) {
        res.status(200).json(person)
    }
    else {
        res.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Phonebook app listening on port ${PORT}`)
    console.log(`Use the API through http://localhost:${PORT}/api/persons`)
})