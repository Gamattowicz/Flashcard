import React from 'react'

const Counter = ({ correctAnswers, wrongAnswers, totalAnswers }) => {
  return (
    <div className="text-center">
      <span className="float-start badge rounded-pill bg-success text-light text-uppercase">
        {correctAnswers} correct
      </span>

      <span className="float-center badge rounded-pill bg-warning text-light text-uppercase">
        {wrongAnswers} wrong
      </span>

      <span className="float-end badge rounded-pill bg-primary text-dark text-uppercase">
        {totalAnswers} total
      </span>
    </div>
  )
}

export default Counter
