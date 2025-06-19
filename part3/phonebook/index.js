require('dotenv').config()
const express = require("express")
const app = express()
const Person = require('./models/person')

const morgan = require("morgan")
morgan.token("body", (req, res) => JSON.stringify(req.body))

//const cors = require("cors")

//app.use(cors())
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
    if (person) {
        if (!Object.hasOwn(person, "name")) {
            throw new Error("New entry does not have name property")
        }
        else if (person.name.length === 0) {
            throw new Error("Name is empty")
        }
        else if (persons.find(value => value.name === person.name)) {
            throw new Error("Name must be unique")
        }
        else if (!Object.hasOwn(person, "number")) {
            throw new Error("New entry does not have number property")
        }
        else if (person.number.length === 0) {
            throw new Error("Number is empty")
        }
    }
    else {
        throw new Error("New entry is empty (undefined)")
    }
}

app.get("/info", (req, res) => {
    const date = Date()
    const person = persons.length > 1? "persons" : "person"
    res.send(`Phonebook has info for ${persons.length} ${person} <br> ${date}`)
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
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

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
    const id = String(Math.floor(Math.random() * 10000))
    const data = req.body
    // Express.js handles automatically errors thrown during synchronous execution
    validate(data)
    const entry = new Person({name: data.name, phone: data.number})
    entry.save().then((saved) => {
        res.status(201).json(saved)
    })
})

// Unknown endpoints
app.use((req, res) => {
    res.status(404).send({error: "Unknown endpoint."})
})

// Error handlers
app.use((error, req, res, next) => {
    console.error(error)
    if (error.name === "CastError") {
        return res.status(400).send({error: "Malformatted ID"})
    }
    else if (error.name === "Error") {
        return res.status(400).send({error: error.message})
    }
    next(error)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Phonebook app listening on port ${PORT}`)
    console.log(`Use the API through http://localhost:${PORT}/api/persons`)
})