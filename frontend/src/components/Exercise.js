import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Exercise = ({ exercise }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/exercises/${exercise.id}`}>
        Exercise number: {exercise.id}
      </Link>
    </Card>
  )
}

export default Exercise
