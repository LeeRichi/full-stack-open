// eslint-disable-next-line react/prop-types
const Filter = ({search, handleSearchChange}) => {
  return (
    <form>
        filter shown with <input value={search} onChange={handleSearchChange}/>
    </form>
  )
}

export default Filter