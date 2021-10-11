import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Exercise from '../components/Exercise'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import {listExercises} from '../actions/exerciseActions'
import Paginate from '../components/Paginate'

const ProfileScreen = ({ history }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, loading, userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { error: errorUpdate, success } = userUpdateProfile

  const exerciseList = useSelector((state) => state.exerciseList)
  const {
    error: errorExercises,
    loading: loadingExercises,
    exercises,
    pages,
    page,
  } = exerciseList

  let keyword = history.location.search

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      if (success) {
      } else {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
      }
    }
    dispatch(listExercises(keyword))
  }, [dispatch, history, userInfo, success, keyword])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo.id,
          username: username,
          email: email,
          password: password,
        })
      )
      setMessage('')
    }
  }

  return (
    <Row>
      <Col xs={10} md={5} className="mx-4">
        <h2 className="text-center">USER PROFILE</h2>

        {message && <Message variant="warning">{message}</Message>}
        {(error || errorExercises || errorUpdate) && (
          <Message variant="warning">
            {error || errorExercises || errorUpdate}
          </Message>
        )}
        {(loading || loadingExercises) && <Loader />}

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

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary mt-3">
            UPDATE
          </Button>
        </Form>
      </Col>

      <Col xs={10} md={5} className="mx-4 text-center">
        <h2>MY EXERCISES</h2>

        <Row>
          {exercises &&
            exercises.map((exercise) => (
              <Row
                key={exercise.id}
                md={2}
                className="align-items-center d-flex justify-content-center w-100"
              >
                <Exercise exercise={exercise} />
              </Row>
            ))}
        </Row>
        <Paginate pages={pages} page={page} path={'/profile'} />
      </Col>
    </Row>
  )
}

export default ProfileScreen
