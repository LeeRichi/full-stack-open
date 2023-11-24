const Total = ({ parts }) =>
{

  const sumOfExercises = parts.reduce((total, part) => total + part.exercises, 0);
  
  return (
    <div>
      <h1>total of exercises: {sumOfExercises}</h1>      
    </div>
  )
}

export default Total