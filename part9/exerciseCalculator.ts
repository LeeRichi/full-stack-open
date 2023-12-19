interface MultiplyValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const mockData = [3, 0, 2, 4.5, 0, 3, 1]

const calculateExercises = (arr: number[], target: number): MultiplyValues =>
{
    const restDays = mockData.filter(data => data === 0).length;
    const averageHours = mockData.reduce((sum, value) => sum + value, 0) / mockData.length;
    const meetTarget = target < averageHours ? true : false;
    const rating = (averageHours > target) ? 3 : (averageHours === target) ? 2 : 1;

    const ratingDescription =
        rating === 3 ? "good" : rating === 2 ? "not bad" : "bad";
        
    return ({
        periodLength: arr.length,
        trainingDays: arr.length - restDays,
        success: meetTarget,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageHours
    })
}

const result = calculateExercises(mockData, 2)
console.log(result)