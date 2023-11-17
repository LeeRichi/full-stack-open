import StatisticLine from './StatisticLine';

const Statistics = ({ good, bad, neutral }) =>
{
  const sum = good + bad + neutral;

  return (
    <div>
      {sum ? (
        <>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />            
                    <tr>
                        <td>All</td>
                        <td>{sum}</td>
                    </tr>
                          
                    <tr>
                        <td>average</td>
                        <td>{sum / 3}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{((good / sum) * 100).toFixed(2)}%</td>
                    </tr>                    
                </tbody>
            </table>           
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default Statistics;
