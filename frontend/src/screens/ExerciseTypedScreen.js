import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  ProgressBar,
  Container,
} from 'react-bootstrap'
import {
  drawWord,
  addExerciseWord,
  addCorrectAnswerWord,
  addWrongAnswerWord,
} from '../actions/wordActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  listExerciseDetails,
  addCorrectAnswerExercise,
  addWrongAnswerExercise,
} from '../actions/exerciseActions'

const ExerciseTypedScreen = ({ match, history }) => {
  const [answer, setAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [wordsNumber, setWordsNumber] = useState(1)
  const [start, setStart] = useState(false)
  const dispatch = useDispatch()

  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { exercise } = exerciseDetails

  const wordDraw = useSelector((state) => state.wordDraw)
  const { error, loading, words } = wordDraw

  useEffect(() => {
    dispatch(listExerciseDetails(match.params.id))
  }, [dispatch])

  const startHandler = (e) => {
    e.preventDefault()
    setStart(true)
    dispatch(drawWord(exercise))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (answer.toUpperCase() === words[0].answer.toUpperCase()) {
      dispatch(addCorrectAnswerExercise(exercise))
      dispatch(addCorrectAnswerWord(words[0]))
      setCorrectAnswer(true)
    } else {
      dispatch(addWrongAnswerExercise(exercise))
      dispatch(addWrongAnswerWord(words[0]))
      setCorrectAnswer(false)
    }
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 500)
    }
    setAnswer('')
  }

  return (
    <Container>
      {start && (
        <Row className="justify-content-md-center">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Col md={5}>
              <ProgressBar
                animated
                variant="success"
                now={((wordsNumber - 1) / exercise.words_num) * 100}
                className="my-3"
              />
              <Card>
                <Card.Title className="text-center fw-bold">
                  QUESTION
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <h2 className="text-center fw-bold">
                        {words[0] &&
                          words.map((word) => (
                            <Col key={word.id}>{word.question}</Col>
                          ))}
                      </h2>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <ListGroup horizontal>
                        <ListGroup.Item md={6}>
                          <Col md={3}>
                            <strong>Category</strong>
                          </Col>
                          <Col md={3}>
                            {words[0] &&
                              words.map((word) => (
                                <Col key={word.id}>{word.category}</Col>
                              ))}
                          </Col>
                        </ListGroup.Item>
                        <ListGroup.Item md={6}>
                          <Col md={3}>
                            <strong>Deck</strong>
                          </Col>
                          <Col md={3}>
                            {words[0] &&
                              words.map((word) => (
                                <Col key={word.id}>{word.deck}</Col>
                              ))}
                          </Col>
                        </ListGroup.Item>
                      </ListGroup>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="answer">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary my-3">
                  CONFIRM
                </Button>
              </Form>
              {correctAnswer !== null ? (
                correctAnswer ? (
                  <Message variant="success">CORRECT ANSWER</Message>
                ) : (
                  <Message variant="danger">WRONG ANSWER</Message>
                )
              ) : (
                ''
              )}
            </Col>
          )}
        </Row>
      )}
      {!start && (
        <div className="text-center">
          <Button variant="primary" size="lg" onClick={startHandler}>
            START
          </Button>
        </div>
      )}
    </Container>
  )
}

export default ExerciseTypedScreen
