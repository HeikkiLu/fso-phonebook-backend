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

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>\n<p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
