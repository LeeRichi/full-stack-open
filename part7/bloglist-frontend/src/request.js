import axios from 'axios'
const baseUrl = '/api/blogs'
const UserUrl = '/api/users'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const create = async(newBlog) =>
{
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const update = async (id, updatedBlog) =>
{
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

export const remove = async (id) =>
{
	console.log(id)
  const config = {
    headers: { Authorization: token },
	}
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export const getAllUsers = async () =>
{
	const res = await axios.get(UserUrl)
	return res.data
}

export const getOneBlog = async (id) =>
{
	const res = await axios.get(`${baseUrl}/${id}`)
	return res.data
}

export const postComment = async (id, comment) =>
{
	const res = await axios.post(`${baseUrl}/${id}/comments`, comment)
	return res.data
};
