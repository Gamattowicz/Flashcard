import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Exercise from '../components/Exercise'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAllExercises } from '../actions/exerciseActions'

const ExercisesAllListScreen = () => {
  const dispatch = useDispatch()
  const exerciseAllList = useSelector((state) => state.exerciseAllList)
  const { error, loading, exercises } = exerciseAllList

  useEffect(() => {
    dispatch(listAllExercises())
  }, [dispatch])

  return (
    <div>
      <h1>All Exercises</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {exercises.map((exercise) => (
            <Col key={exercise.id} sm={12} md={6} lg={4} xl={3}>
              <Exercise exercise={exercise} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default ExercisesAllListScreen
