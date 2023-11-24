/* eslint-disable react/prop-types */
const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {country.languages &&
          Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>
              {name}
            </li>
          ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.official}'s flag`} />
    </div>
  );
};

export default CountryDetails;