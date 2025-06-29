require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('body', (req, _res) => JSON.stringify(req.body))

//const cors = require("cors")

//app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

function validate(person) {
  if (person) {
    if (!Object.hasOwn(person, 'name')) {
      throw new Error('New entry does not have name property')
    }
    else if (person.name.length === 0) {
      throw new Error('Name is empty')
    }
    else if (!Object.hasOwn(person, 'number')) {
      throw new Error('New entry does not have number property')
    }
    else if (person.number.length === 0) {
      throw new Error('Number is empty')
    }
  }
  else {
    throw new Error('New entry is empty (undefined)')
  }
}

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(result => {
      const date = Date()
      const person = result !== 1? 'persons' : 'person'
      res.send(`Phonebook has info for ${result} ${person} <br> ${date}`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.status(200).json(person)
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(_result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const data = req.body
  // Express.js handles automatically errors thrown during synchronous execution
  validate(data)
  // Check if there is a contact with the same name already
  Person.find({ name: data.name })
    .then(result => {
      if (result.length > 0) throw new Error('Name must be unique')
      // Insert new entry into the dataset
      const entry = new Person({ name: data.name, phone: data.number })
      entry.save()
        .then((saved) => {
          res.status(201).json(saved)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const data = req.body
  validate(data)
  // Check if there is an entry with such id
  Person.findById(req.params.id)
    .then(entry => {
      console.log('Entry', entry)
      if (!entry) res.status(404).send({ error: 'Contact no longer exists!' })
      entry.phone = data.number
      // It's not necessary to enable validation on update here because
      // I'm not using that API to perform updates, save() does validation
      // as part of its process.
      entry.save()
        .then((saved) => {
          res.status(201).json(saved)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

// Unknown endpoints
app.use((req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' })
})

// Error handlers
app.use((error, req, res, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted ID' })
  }
  else if (error.name === 'ValidationError') {
    console.log(error.message)
    return res.status(400).json({ error: error.message.split(': ').pop() })
  }
  else if (error.name === 'Error') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Phonebook app listening on port ${PORT}`)
  console.log(`Use the API through http://localhost:${PORT}/api/persons`)
})