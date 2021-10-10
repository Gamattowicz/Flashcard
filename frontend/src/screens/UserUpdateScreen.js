import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUserDetails, updateUser} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

const UserUpdateScreen = ({ match, history }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(true)

  const [message] = useState('')
  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, success, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success: successUserUpdate } = userUpdate

  useEffect(() => {
    if (!userInfo.is_admin) {
      history.push('/login')
    }
    if (successUserUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      setLoaded(false)
      history.push('/admin/usersList')
    } else {
      if (!success || !loaded) {
        dispatch(listUserDetails(match.params.id))
        setLoaded(true)
      } else {
        setUsername(user.username)
        setEmail(user.email)
        setIsAdmin(user.is_admin)
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    user,
    success,
    successUserUpdate,
    match.params.id,
    loaded,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        id: user.id,
        username: username,
        email: email,
        is_admin: isAdmin,
      })
    )
  }

  return (
    <Row>
      <Col md={4} className="mx-4">
        <Link onClick={history.goBack} className="btn btn-outline-primary my-3">
          GO BACK
        </Link>
        <h2>UPDATE USER</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="is_admin" className="mt-3">
            <Form.Check
              type="checkbox"
              onChange={(e) => setIsAdmin(Boolean(!isAdmin))}
              checked={isAdmin}
              label="Admin?"
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary mt-3">
            UPDATE
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default UserUpdateScreen
