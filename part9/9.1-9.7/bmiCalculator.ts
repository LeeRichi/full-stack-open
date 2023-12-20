interface BmiResult {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): BmiResult =>
{
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

   return {
    weight,
    height,
    bmi: `${bmi} - ${message}`,
  };
};

export default calculateBmi;
