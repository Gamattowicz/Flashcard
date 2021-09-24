import React from 'react'
import {useSelector} from 'react-redux'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Exercise = ({ exercise }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/exercises/${exercise.id}`}>
        Exercise number: {exercise.id}
        <br />
        <small>Date: {exercise.created_at.slice([0, 1])}</small>
        <br />
      </Link>
      {userInfo.is_admin && (
        <Link to={`/admin/user/${exercise.user_id}`}>
          <small>User: {exercise.user_name}</small>
        </Link>
      )}
    </Card>
  )
}

export default Exercise
