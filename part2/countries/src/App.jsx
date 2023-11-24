/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import ApiCalls from '../../countries/src/ApiCalls'
import CountryDetails from './CountryDetails';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(null);
  const [countryDetail, setCountryDetail] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (!countries) {
      ApiCalls.getAll()
        .then(res => {
          setCountries(res);
        });
    }
  }, [countries]);

  const onClickShowDetail = (name) => {
    ApiCalls.getOne(name)
      .then(res => {
        setCountryDetail(res);
      });
  }

  const filteredCountries = countries?.filter((country) =>
    country.name.official.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <form>
        <p>find countries</p>
        <input value={search} onChange={handleSearchChange} />
      </form>
      <div>
        {countryDetail ? (
          <CountryDetails country={countryDetail} />
        ) : (
            search.length === 0 ? (
              <p>Enter the country name</p>
            ) : filteredCountries.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) : filteredCountries.length === 1 ? (
              <CountryDetails country={filteredCountries[0]} />
            ) : (
              <ul>
                {filteredCountries?.map((country, index) => (
                  <li key={index}>
                    {country.name.official}
                    <button onClick={() => onClickShowDetail(country.name.official)}>show</button>
                  </li>
                ))}
              </ul>
            )
          )}
      </div>
    </div>
  );
}

export default App;
