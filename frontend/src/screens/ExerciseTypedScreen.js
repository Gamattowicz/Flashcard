import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, ProgressBar, Container } from 'react-bootstrap'
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
import TypedCard from '../components/TypedCard'

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
      console.log(correctAnswer)
    } else {
      dispatch(addWrongAnswerExercise(exercise))
      dispatch(addWrongAnswerWord(words[0]))
      setCorrectAnswer(false)
      console.log(correctAnswer)
    }
    dispatch(addExerciseWord(words[0]))
    setTimeout(() => {
      dispatch(drawWord(exercise))
      setCorrectAnswer(null)
    }, 800)

    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 800)
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
              {words[0] &&
                words.map((word) => (
                  <TypedCard key={word.id} word={words[0]} />
                ))}
              <Form onSubmit={submitHandler} className="mt-3">
                <Form.Group controlId="answer">
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
              {correctAnswer == true && (
                <Message variant="success">CORRECT ANSWER</Message>
              )}
              {correctAnswer == false && (
                <Message variant="warning">
                  WRONG. CORRECT ANSWER IS:
                  {words[0] &&
                    words.map((word) => (
                      <p className="fst-italic fw-bold">"{word.answer}"</p>
                    ))}
                </Message>
              )}
            </Col>
          )}
        </Row>
      )}
      {!start && (
        <div className="d-grid mt-5">
          <Button variant="primary" size="lg" onClick={startHandler}>
            START
          </Button>
        </div>
      )}
    </Container>
  )
}

export default ExerciseTypedScreen
