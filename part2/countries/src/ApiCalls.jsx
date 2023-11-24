import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY;

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data)
}

const getOne = (name) =>
{
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then(response => response.data)
}

const getWeather = (lat, lon) =>
{
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const request = axios.get(weatherUrl);
  return request.then(response => response.data);
}

export default { getAll, getOne, getWeather }