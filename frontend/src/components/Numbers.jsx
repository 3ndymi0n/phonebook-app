const Numbers = ({persons, newSearch, HandleDeleteButton }) => {
    const personList = persons
                      .filter(person => person.name.toLowerCase().startsWith(newSearch.toLowerCase()))
                      .map(person => <tr key={person.id}>
                                        <td><b>{person.name}</b></td>
                                        <td>{person.number} </td>
                                        <td><button  onClick={() => HandleDeleteButton(person.id)}>Delete</button></td>
                                    </tr>)
    return (
      personList
    )
  }

  export default Numbers