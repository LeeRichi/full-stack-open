/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'
import ApiCalls from './ApiCalls'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setsearch] = useState('')
  const [createdMessage, setCreatedMessage] = useState('');

  useEffect(() => {
    ApiCalls
    .getAll()
      .then(response => {
        setPersons(response)         
      })    
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const targetPerson = persons.find((person) => person.name === newName);

    if (targetPerson)
    {
      const isConfirmed = window.confirm(`${newName} is already added to phonebook, do you want to raplace the old number with the new one?`);

      if (isConfirmed)
      {
        ApiCalls.update(targetPerson.id, personObject)
          .then(returnPerson =>
          {
            setPersons(persons.map(person => person.id !== targetPerson.id ? person : returnPerson))
            setNewName('')
            setNewNumber('')
            setCreatedMessage(`${newName}'s number has chnaged to ${newNumber}`);
          }).catch(err =>
          {
            console.log('err occur: ', err)
          })
      }
      return
    }

    ApiCalls.create(personObject)
      .then(returnPerson =>
      {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
        setCreatedMessage(`Added ${newName}`);
      }).catch(err =>
      {
        console.error(err)
      })
  }

  const handleSearchChange = (e) =>
  {
    setsearch(e.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification newName={newName} createdMessage={createdMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} setPersons={setPersons} persons={persons} />
    </div>
  )
}

export default App