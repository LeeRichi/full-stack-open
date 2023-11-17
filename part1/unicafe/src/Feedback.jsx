const Feedback = ({ setGood, setNeutral, setBad }) =>
{
    const onGoodClick = () =>
    {
        setGood((prev) => prev + 1)
    }

    const onNeutralClick = () =>
    {
        setNeutral((prev) => prev + 1)
    }

    const onBadClick = () =>
    {
        setBad((prev) => prev + 1)
    }

  return (
    <div>
        <button onClick={onGoodClick}>good</button>
        <button onClick={onNeutralClick}>neutral</button>
        <button onClick={onBadClick}>bad</button>
    </div>
  )
}

export default Feedback