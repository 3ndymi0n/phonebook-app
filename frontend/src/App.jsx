import { useState, useEffect } from 'react'
import noteService from './services/persons'
import SearchForm from './components/SearchForm'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, SetNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState('hidden')

  useEffect (() => {
    noteService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    
    const nameExists = persons.some(person => person.name === newName)
    
    if (nameExists && newPhone.length != 0) {
      if(window.confirm(`${newName} already exists, would you like to update their contact number?`)) {
        const personId = persons.find(person => person.name === newName)?.id
        const personObject = {
          name: newName,
          number: newPhone
        }
        noteService
          .update(personId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personId ? returnedPerson : person))
            setNewName('')
            setNewPhone('')
          })
          .catch(error => {
            setNotificationClass('error')
            setNotificationMessage(`${newName} has already been removed from the server.`)
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationClass('hidden')
              setNewName('')
              setNewPhone('')
            }, 5000);
          })
      }
    }else if (newPhone.length === 0) {
      alert(`${newName} also requires a phone number.`)
    }else {
      const personObject = {
        name: newName,
        number: newPhone
      }
      noteService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
      setNotificationClass('notification')
      console.log(notificationClass)
      setNotificationMessage(
        `${newName} has been added to the phonebook`)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationClass('hidden')
      }, 5000)
    }
  }  

  const handlePersonUpdate = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneUpdate = (event) => {
    let digits = event.target.value.replace(/\D/g, '')
    digits = digits.slice(0,10)

    let formatted = '';
    if(digits.length >= 4) {
      formatted = digits.slice(0,4) + '-';
      if (digits.length >= 7) {
        formatted += digits.slice(4,7) + '-';
        formatted += digits.slice(7);
      } else {
        formatted += digits.slice(4);
      }
    } else {
      formatted = digits
    }

    event.target.value = formatted;

    setNewPhone(event.target.value)
  }

  const handleSearchUpdate = (event) => { 
    const search = event.target.value
    SetNewSearch(search)
  }

  const HandleDeleteButton = (id) => {
    const name = persons.find(person => person.id === id)?.name
    console.log(name)
    if(window.confirm(`Are you sure you want to delete ${name}`)) {
      noteService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      }
    }

  return (
    <div className={"content"}>
      <div className={"forms"}>
        <Notification notificationClass={notificationClass} message={notificationMessage} />
        <h2>Add Phonebook Entry</h2>
        <PersonForm addPerson={addPerson} newName={newName} 
                    handlePersonUpdate={handlePersonUpdate} 
                    newPhone={newPhone} handlePhoneUpdate={handlePhoneUpdate} />
        <h2>Phone Numbers</h2>
        <SearchForm newSearch={newSearch} handleSearchUpdate={handleSearchUpdate} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <Numbers persons={persons} newSearch={newSearch} HandleDeleteButton={HandleDeleteButton} />
        </tbody>
      </table>
    </div>

  )
}

export default App