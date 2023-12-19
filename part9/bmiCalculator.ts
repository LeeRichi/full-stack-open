const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  let message = '';

  if (bmi < 18.5) {
    message = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    message = 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    message = 'Overweight';
  } else {
    message = 'Obese';
  }

  return message;
};

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

const result = calculateBmi(a, b)
console.log(result)

export default calculateBmi;
