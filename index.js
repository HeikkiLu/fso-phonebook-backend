const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Jans",
      "number": "123-1234123",
      "id": 6
    },
    {
      "name": "jakob",
      "number": "555666",
      "id": 10
    },
    {
      "name": "Kepa",
      "number": "123",
      "id": 11
    },
    {
      "name": "Kartsa",
      "number": "23",
      "id": 14
    },
    {
      "name": "koira",
      "number": "666",
      "id": 16
    },
    {
      "name": "kissa",
      "number": "333",
      "id": 17
    }
  ]


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number missing'
        })
    }

    if(persons.some(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>\n<p>${new Date()}</p>`)
})

const generateId = () => {
    return Math.floor(Math.random()*1000)
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
