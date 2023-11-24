import ApiCalls from "./ApiCalls";

/* eslint-disable react/prop-types */
const Persons = ({ filteredPersons, persons ,setPersons }) =>
{
  const onHandleDelete = (id) =>
  {
    const isConfirmed = window.confirm('Are you sure you want to delete this person?');

    if (isConfirmed)
    {
      ApiCalls.deletePerson(id)
      .then(() =>
      {
        console.log(`id: ${id} has been deleted.`);
        setPersons(persons.filter((person) => person.id !== id));
      }).catch(error => {
        console.error('Error deleting person:', error);
      });
    } else
    {
      console.log('user canceled the delete-action')
    }
  }
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <li>
            {person.name} {person.number}
            <button onClick={() => onHandleDelete(person.id)}>Delete</button>
          </li>
        </div>
      ))}
    </div>
  );
};

export default Persons;
