const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`Connecting to ${url}`)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log(`Failed to connect MongoDB: ${error.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (v => {return /\d{2,3}-\d{7,}/.test(v)})
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)


