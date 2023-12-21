import React from 'react';
import { Diary } from '../types';

interface DiariesProps {
  diaries: Diary[];
}

const Diaries: React.FC<DiariesProps> = ({ diaries }) => {
  console.log(diaries);

  return (
    <div>
      {diaries.map(diary => (
        <div key={diary.id}>
          <p>{diary.id}</p>
          <p>{diary.date}</p>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Diaries;
