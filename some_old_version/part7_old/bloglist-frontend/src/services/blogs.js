import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getOne = async(id) =>
{
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const createNew = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateOne = async (id, newObject) =>
{
  try
  {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteOne = async(id) =>
{
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) =>
{
  try
  {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { content: comment });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { 
  getAll, getOne, createNew, updateOne, setToken, deleteOne, addComment
}