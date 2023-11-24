import ApiCalls from "./ApiCalls";
import {useState, useEffect} from 'react'

/* eslint-disable react/prop-types */
const CountryDetails = ({ country }) =>
{
  const [countryWeather, setCountryWeather] = useState(null)

  useEffect(() => {
    if (country.latlng)
    {
      const [lat, lon] = country.latlng;
      ApiCalls.getWeather(lat, lon)
        .then(res => {
          setCountryWeather(res);
        });
    }
  }, [])
    
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
      <h1>Weather in {country.name.official}</h1> 
      <p>temperature {countryWeather?.main.temp} Fahrenheit</p>
      <img src={`https://openweathermap.org/img/wn/${countryWeather?.weather[0].icon}@2x.png`} alt={countryWeather?.weather[0].icon} />
      <p>wind {countryWeather?.wind.speed } m/s</p>
    </div>
  );
};

export default CountryDetails;