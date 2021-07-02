import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import User from '../components/User'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers } from '../actions/userActions'

const UsersListScreen = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { error, loading, users } = userList

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {users.map((user) => (
            <Col key={user.id} sm={12} md={6} lg={4} xl={3}>
              <User user={user} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default UsersListScreen
