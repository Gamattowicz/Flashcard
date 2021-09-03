import React from 'react'

const Counter = ({ correctAnswers, wrongAnswers, totalAnswers }) => {
  return (
    <div className="text-center">
      <span className="float-start badge rounded-pill bg-success text-light text-uppercase">
        {correctAnswers} correct answers
      </span>

      <span className="float-center badge rounded-pill bg-warning text-light text-uppercase">
        {wrongAnswers} wrong answers
      </span>

      <span className="float-end badge rounded-pill bg-primary text-dark text-uppercase">
        {totalAnswers} total answers
      </span>
    </div>
  )
}

export default Counter
