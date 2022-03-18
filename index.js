const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')



app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :status :res[content-length] - :response-time ms :person')
);
app.use(cors())

morgan.token('person', (req) => JSON.stringify(req.body));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => res.json(person))
        .catch(error => next(error))
})
    
app.delete('/api/persons/:id', (req, res, next) => {
    console.log(req.params.id)
    Person.findOneAndRemove(req.params.id) 
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number missing'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true}) 
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))

})


app.get('/info', (req, res) => {
    Person.countDocuments({})
        .then(count => res.send(`<p>Phonebook has info for ${count} people</p>\n<p>${new Date()}</p>`)
)
    


})


const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(`Name: ${error.name}\nMessage: ${error.message}`)

    if(error.name === 'CastError') return res.status(400).send({error: 'Malformatted id'})
    if(error.name === 'ValidationError') return res.status(400).send({error: 'Invalid input'})

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

