const SearchForm = ({ newSearch, handleSearchUpdate}) => {
  return (
      <p><strong>Search Phonebook:</strong><input name="search" value={newSearch} 
      placeholder="Search" onChange={(handleSearchUpdate)}/></p>
    )
  }

export default SearchForm