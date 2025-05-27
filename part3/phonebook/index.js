const express = require("express")
const app = express()

const morgan = require("morgan")
morgan.token("body", (req, res) => JSON.stringify(req.body))

const cors = require("cors")

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

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

function validate(person) {
    error = []
    if (person) {
        if (!Object.hasOwn(person, "name")) {
            error.push("New entry does not have name property")
        }
        else if (persons.find(value => value.name === person.name)) {
            error.push("Name must be unique")
        }
        if (!Object.hasOwn(person, "number")) {
            error.push("New entry does not have number property")
        }
    }
    else {
        error.push("New entry is empty (undefined)")
    }
    return error
}


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

app.delete("/api/persons/:id", (req, res) => {
    persons = persons.filter(val => val.id != req.params.id)
    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    const id = String(Math.floor(Math.random() * 10000))
    const data = req.body
    const error = validate(data)
    if (error.length == 0) {
        const person = {id, ...data}
        persons.push(person)
        res.status(201).json({id, ...person})
    }
    else {
        res.status(400).json({length: error.length, error: error})
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Phonebook app listening on port ${PORT}`)
    console.log(`Use the API through http://localhost:${PORT}/api/persons`)
})