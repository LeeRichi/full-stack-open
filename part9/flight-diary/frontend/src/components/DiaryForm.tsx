import React, { useState } from 'react';
import { NewDiary } from '../types';
import { createDiaries } from '../services/diaryService';
import axios from 'axios';

interface DiaryFormProps {
  setNewDiary: React.Dispatch<React.SetStateAction<string>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const DiaryForm: React.FC<DiaryFormProps> = ({ setNewDiary, setNotification }) => {
  const [newDate, setNewDate] = useState<string>('');
  const [newWeather, setNewWeather] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');

  const handleDiaryCreation = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const newDiary: NewDiary = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };

    try {
      const createdDiary = await createDiaries(newDiary);      
      setNewDiary('');
      setNewDate('');
      setNewWeather('');
      setNewVisibility('');
      setNewComment('');
      setNotification('Diary added successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        if (responseData) {
          setNotification(responseData);
        } else {
          setNotification('Error creating diary: Something went wrong1.');
        }
      } else {
        setNotification('Error creating diary: Something went wrong2.');
      }
    }
  };
  return (
    <form onSubmit={handleDiaryCreation}>
      <div>
        <label>Date:</label>
        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
      </div>
      <div>
        <label>Weather:</label>
        <input type="radio" name="weather" value="sunny" checked={newWeather === 'sunny'} onChange={() => setNewWeather('sunny')} /> Sunny
        <input type="radio" name="weather" value="rainy" checked={newWeather === 'rainy'} onChange={() => setNewWeather('rainy')} /> Rainy
        <input type="radio" name="weather" value="cloudy" checked={newWeather === 'cloudy'} onChange={() => setNewWeather('cloudy')} /> Cloudy
        <input type="radio" name="weather" value="windy" checked={newWeather === 'windy'} onChange={() => setNewWeather('windy')} /> Windy
      </div>
      <div>
        <label>Visibility:</label>
        <input type="radio" name="visibility" value="great" checked={newVisibility === 'great'} onChange={() => setNewVisibility('great')} /> Great
        <input type="radio" name="visibility" value="good" checked={newVisibility === 'good'} onChange={() => setNewVisibility('good')} /> Good
        <input type="radio" name="visibility" value="ok" checked={newVisibility === 'ok'} onChange={() => setNewVisibility('ok')} /> Ok
        <input type="radio" name="visibility" value="poor" checked={newVisibility === 'poor'} onChange={() => setNewVisibility('poor')} /> Poor
      </div>
      <div>
        <label>Comment:</label>
        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
      </div>
      <button type="submit">Add Diary</button>
    </form>
  );
};

export default DiaryForm;
