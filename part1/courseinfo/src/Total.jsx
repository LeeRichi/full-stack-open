const Total = ({ parts }) =>
{

  const sumOfExercises = parts.reduce((total, part) => total + part.exercises, 0);
  console.log(sumOfExercises)

  return (
    <div>
      Total number of exercises: {sumOfExercises}
    </div>
  )
}

export default Total