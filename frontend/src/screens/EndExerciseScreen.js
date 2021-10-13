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
          <Col xs={12} md={7}>
            <h4>Your exercise session has ended.</h4>
            <Card className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col xs={4} md={3} className="align-self-center my-2">
                      <strong>Words number</strong>
                    </Col>
                    <Col
                      xs={8}
                      md={3}
                      className="text-center align-self-center my-2"
                    >
                      {exercise.words_num}
                    </Col>
                    <Col xs={4} md={3} className="align-self-center my-2">
                      <strong>Time</strong>
                    </Col>
                    <Col
                      xs={8}
                      md={3}
                      className="text-center align-self-center my-2"
                    >
                      {new Date(exercise.time * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col
                      xs={4}
                      md={3}
                      className="align-self-center text-success my-2"
                    >
                      <strong>Correct answers</strong>
                    </Col>
                    <Col
                      xs={8}
                      md={3}
                      className="text-center text-success align-self-center my-2"
                    >
                      {exercise.correct_answers}
                    </Col>
                    <Col
                      xs={4}
                      md={3}
                      className="align-self-center text-warning my-2"
                    >
                      <strong>Wrong answers</strong>
                    </Col>
                    <Col
                      xs={8}
                      md={3}
                      className="text-center text-warning align-self-center my-2"
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
