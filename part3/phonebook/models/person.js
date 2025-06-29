const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Trying to connect to: ', url)
mongoose.connect(url)
  .then((_result) => {
    console.log('Connection succeded')
  })
  .catch((error) => {
    console.log('IT SEEMS \n AN ERROR\n HAS MATERIALIZED\n', error)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Names must be 3 or more characters long!'],
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: (value) => /^\d{2,3}-\d+$/.test(value) && value.length >= 8,
      message: '{VALUE} is not a valid phone number! Must contain 2 or 3 numbers followed by a hyphen (-) and then more numbers and should have a minimum length of 8.'
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.number = returnedObject.phone
    delete returnedObject.phone
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('Person', personSchema)