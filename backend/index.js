const express = require('express')
const express = require('cors')
const morgan = require('morgan')

const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(cors())

//morgan.token('body', (req) => JSON.stringify(req.body))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let contacts = [
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

const generateId = () => {
    const maxId = contacts.length > 0
        ? Math.max(...contacts.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.send(contacts)
})

app.get('/info', (request, response) => {
    const now = new Date()
    const contactInfo = `<p> Phonebook has info for ${contacts.length} people.</p>
                         <p>${now.toString()}</p>`
    response.send(contactInfo)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = contacts.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        response.status(404).json({
            error: 'content missing'
        })
    }else if (contacts.some(person => person.number === body.number)) {
        response.status(404).json({
            error: 'Number exists'
        })
    }else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateId()
        }

        contacts = contacts.concat(person)
        console.log(person)
        response.json(person)
    }
})

app.use(unknownEndpoint)

const PORT=3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`)
})