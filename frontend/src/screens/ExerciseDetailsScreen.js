import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { listExerciseDetails } from '../actions/exerciseActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ExerciseChart from '../components/ExerciseChart'

const ExerciseDetailsScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { error, loading, exercise } = exerciseDetails

  useEffect(() => {
    dispatch(listExerciseDetails(match.params.id))
  }, [dispatch])

  return (
    <div>
      <Link onClick={history.goBack} className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={2} className="align-self-center text-success">
                    <strong>Correct answers</strong>
                  </Col>
                  <Col md={4} className="text-center text-success">
                    {exercise.correct_answers}
                  </Col>
                  <Col md={2} className="align-self-center text-warning">
                    <strong>Wrong answers</strong>
                  </Col>
                  <Col md={4} className="text-center text-warning">
                    {exercise.wrong_answers}
                  </Col>
                </Row>
              </ListGroup.Item>

              <Card.Footer className="text-muted">
                <Row>
                  <Col md={2}>
                    <strong>Deck</strong>
                  </Col>
                  <Col md={4} className="text-center">
                    {' '}
                    <Link
                      to={`/decks/${exercise.deck_id}`}
                      style={{ color: '#839496' }}
                      className="fst-italic fw-lighter"
                    >
                      {exercise.deck}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <strong>Start date</strong>
                  </Col>
                  <Col md={4} className="text-center"></Col>
                </Row>
              </Card.Footer>
            </ListGroup>
          </Card>
        </Col>
      )}
      <ExerciseChart
        data={[
          {
            name: 'GOOD ANSWERS',
            value: exercise.correct_answers,
          },
          { name: 'BAD ANSWERS', value: exercise.wrong_answers },
        ]}
        colors={['#00C49F', '#FF8042']}
      />
    </div>
  )
}

export default ExerciseDetailsScreen
