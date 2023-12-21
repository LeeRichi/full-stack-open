import axios from 'axios';
import { Diary, NewDiary } from "../types";
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://localhost:3000/api'

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(`${baseUrl}/diaries`)
    .then(response => response.data)
}

export const createDiaries = (object: NewDiary) =>
{
  console.log(object)
  const newObj: Diary = {
    ...object,
    id: uuidv4(),
  }
  console.log(newObj)
  return axios
    .post<Diary>(`${baseUrl}/diaries`, newObj)
    .then(response => response.data)
}