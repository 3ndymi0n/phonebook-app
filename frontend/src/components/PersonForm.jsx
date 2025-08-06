const PersonForm = ({addPerson, newName, handlePersonUpdate, newPhone, handlePhoneUpdate}) => {
    return (
      <div>
          <form onSubmit={addPerson}>
            <div>
              <p><strong>Name: </strong> <input name="person" value={newName}
                placeholder="Enter Name" onChange={(handlePersonUpdate)}/></p>
              <p><strong>Phone: </strong><input name="phone" value={newPhone} 
                placeholder="Enter Phone Number"onChange={(handlePhoneUpdate)} maxLength={'12'}/></p>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
      </div>
    )
  }

export default PersonForm