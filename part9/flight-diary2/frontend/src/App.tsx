import './App.css';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';
import { getAllDiaries, createDiaries } from './services/diaryService';
import { useState, useEffect } from 'react';
import { Diary, NewDiary } from './types';
import Notification from './components/Notification';

function App()
{
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [newDiary, setNewDiary] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllDiaries().then(data =>
    {
      setDiaries(data)
    })
  }, [notification])

  return (
    <>
      <Notification notification={notification} setNotification={setNotification} />
      <DiaryForm setNewDiary={setNewDiary} setNotification={setNotification}/>
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
