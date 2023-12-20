import React from 'react';
import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <div key={index}>
          <p>
            <strong>{part.name}</strong> - {part.exerciseCount} exercises
          </p>

          {renderAdditionalInfo(part)}
        </div>
      ))}
    </>
  );
};

const renderAdditionalInfo = (part: CoursePart) => {
  switch (part.kind) {
    case 'basic':
      return <p>Description: {part.description}</p>;

    case 'group':
      return <p>Group Project Count: {part.groupProjectCount}</p>;

    case 'background':
      return (
        <>
          <p>Description: {part.description}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </>
      );

    case 'special':
      return (
        <>
          <p>Description: {part.description}</p>
          <p>Requirements: {part.requirements.join(', ')}</p>
        </>
      );

    default:
      return null;
  }
};

export default Content;
