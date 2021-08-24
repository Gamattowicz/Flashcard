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

const ExerciseScreen = ({ match, history }) => {
  const [definition, setDefinition] = useState('')
  const [answer, setAnswer] = useState(null)
  const [wordsNumber, setWordsNumber] = useState(1)
  const dispatch = useDispatch()

  const wordDraw = useSelector((state) => state.wordDraw)
  const { error, loading, words } = wordDraw

  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { exercise } = exerciseDetails

  useEffect(() => {
    dispatch(drawWord(exercise))
    dispatch(listExerciseDetails(match.params.id))
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (definition.toUpperCase() === words[0].definition.toUpperCase()) {
      dispatch(addCorrectAnswerExercise(exercise))
      dispatch(addCorrectAnswerWord(words[0]))
      setAnswer(true)
    } else {
      dispatch(addWrongAnswerExercise(exercise))
      dispatch(addWrongAnswerWord(words[0]))
      setAnswer(false)
    }
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 500)
    }
    setDefinition('')
  }

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
                            <Col key={word.id}>{word.name}</Col>
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
                <Form.Group controlId="definition">
                  <Form.Label>Definition</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter definition"
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary my-3">
                  CONFIRM
                </Button>
              </Form>
              {answer !== null ? (
                answer ? (
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
      </Container>
    </div>
  )
}

export default ExerciseScreen
