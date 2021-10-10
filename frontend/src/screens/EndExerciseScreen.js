import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Col, Container, ListGroup, Row} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listExerciseDetails} from '../actions/exerciseActions'
import ExerciseChart from '../components/ExerciseChart'

const EndExerciseScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { loading, error, exercise } = exerciseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listExerciseDetails(match.params.id))
    }
  }, [dispatch, history, userInfo, match.params.id])

  return (
    <Container>
      <Row className="justify-content-md-center">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Col md={5}>
            <h4>Your exercise session has ended.</h4>
            <Card className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={2} className="align-self-center ">
                      <strong>Words number</strong>
                    </Col>
                    <Col md={4} className="text-center align-self-center">
                      {exercise.words_num}
                    </Col>
                    <Col md={2} className="align-self-center">
                      <strong>Time</strong>
                    </Col>
                    <Col md={4} className="text-center align-self-center">
                      {new Date(exercise.time * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={2} className="align-self-center text-success">
                      <strong>Correct answers</strong>
                    </Col>
                    <Col
                      md={4}
                      className="text-center text-success align-self-center"
                    >
                      {exercise.correct_answers}
                    </Col>
                    <Col md={2} className="align-self-center text-warning">
                      <strong>Wrong answers</strong>
                    </Col>
                    <Col
                      md={4}
                      className="text-center text-warning align-self-center"
                    >
                      {exercise.wrong_answers}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <ExerciseChart
              data={[
                {
                  name: 'Correct answers',
                  value: exercise.correct_answers,
                },
                { name: 'Wrong answers', value: exercise.wrong_answers },
              ]}
              colors={['#2aa198', '#cb4b16']}
            />
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default EndExerciseScreen
