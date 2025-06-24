const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Incorrect number of parameters. The usage is as shown next:')
  console.log('For inserting persons into the database:')
  console.log('   node mongo.js <password> <name> <phone number>')
  console.log('For querying all entries:')
  console.log('   node mongo.js <password>')
  return
}

const insertData = process.argv.length === 5? true: false
const password = process.argv[2]
const url = `mongodb+srv://gato:${password}@cluster0.n6ooclw.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Person = new mongoose.model('Person', personSchema)

if (insertData) {
  const name = process.argv[3]
  const number = process.argv[4]
  const entry = new Person({ name: name, phone: number })
  entry.save().then(_result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(persons => {
    persons.forEach(elem => {
      console.log(`${elem.name} ${elem.phone}`)
    })
    mongoose.connection.close()
  })
}