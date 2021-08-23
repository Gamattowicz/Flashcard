import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listExerciseDetails } from '../actions/exerciseActions'

const EndExerciseScreen = ({ match }) => {
  const dispatch = useDispatch()

  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { loading, error, exercise } = exerciseDetails

  useEffect(() => {
    dispatch(listExerciseDetails(match.params.id))
  }, [dispatch])

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Col md={5}>
              <h4>Your exercise session has ended.</h4>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Words number</strong>
                      </Col>
                      <Col>{exercise.words_num}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Correct answers</strong>
                      </Col>
                      <Col>{exercise.correct_answers}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Wrong number answers</strong>
                      </Col>
                      <Col>{exercise.wrong_answers}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default EndExerciseScreen
