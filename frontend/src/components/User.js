import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/admin/user/${user.id}`}>{user.username}</Link>
    </Card>
  )
}

export default User
