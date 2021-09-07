import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Exercise = ({ exercise }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/exercises/${exercise.id}`}>
        Exercise number: {exercise.id}
        <br />
        <small>Date: {exercise.created_at.slice([0, 1])}</small>
      </Link>
    </Card>
  )
}

export default Exercise
