const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Password missing from arguments. "node mongo.js {password} {name} {number}"')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://luigi:${password}@cluster0.in8ai.mongodb.net/personDatabase?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(Person => {
      console.log(`${Person.name} ${Person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`Person ${name} with number ${number} saved to phonebook`)
    mongoose.connection.close()
  })
}
