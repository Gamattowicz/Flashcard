import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Col, ListGroup, Row} from 'react-bootstrap'
import {listExerciseDetails} from '../actions/exerciseActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ExerciseChart from '../components/ExerciseChart'

const ExerciseDetailsScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { error, loading, exercise } = exerciseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listExerciseDetails(match.params.id))
    }
  }, [dispatch, userInfo, history, match.params.id])

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
        <Col xs={12} md={7}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col xs={4} md={3} className="align-self-center ">
                    <strong>Words number</strong>
                  </Col>
                  <Col
                    xs={8}
                    md={3}
                    className="text-center align-self-center my-2"
                  >
                    {exercise.words_num}
                  </Col>
                  <Col xs={4} md={3} className="align-self-center">
                    <strong>Time</strong>
                  </Col>
                  <Col
                    xs={8}
                    md={3}
                    className="text-center align-self-center my-2"
                  >
                    {exercise.time > 0
                      ? new Date(exercise.time * 1000)
                          .toISOString()
                          .substr(11, 8)
                      : `00:00:00`}
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
                  <Col xs={8} md={3} className="text-center text-success my-2">
                    {exercise.correct_answers}
                  </Col>
                  <Col
                    xs={4}
                    md={3}
                    className="align-self-center text-warning my-2"
                  >
                    <strong>Wrong answers</strong>
                  </Col>
                  <Col xs={8} md={3} className="text-center text-warning my-2">
                    {exercise.wrong_answers}
                  </Col>
                </Row>
              </ListGroup.Item>

              <Card.Footer className="text-muted">
                <Row>
                  <Col xs={4} md={3} className="my-2">
                    <strong>Deck</strong>
                  </Col>
                  <Col xs={8} md={3} className="text-center my-2">
                    <Link
                      to={`/decks/${exercise.deck_id}`}
                      style={{ color: '#839496' }}
                      className="fst-italic fw-lighter"
                    >
                      {exercise.deck}
                    </Link>
                  </Col>
                  <Col xs={4} md={3} className="my-2">
                    <strong>Start date</strong>
                  </Col>
                  <Col xs={8} md={3} className="text-center my-2">
                    {exercise.created_at}
                  </Col>
                </Row>
              </Card.Footer>
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
    </div>
  )
}

export default ExerciseDetailsScreen
