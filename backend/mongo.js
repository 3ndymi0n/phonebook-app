const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dbAdmin:${password}@cluster0.i6u4lat.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length < 4) {
    
    console.log('Phonebook')

    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) {
    
    const note = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    note.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
} else {
    
    console.log('Unknown arguments provided')
}



