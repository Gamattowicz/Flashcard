import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Col, Container, Form, ProgressBar, Row} from 'react-bootstrap'
import {addCorrectAnswerWord, addExerciseWord, addWrongAnswerWord, drawWord,} from '../actions/wordActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
    addCorrectAnswerExercise,
    addWrongAnswerExercise,
    listExerciseDetails,
    updateExerciseTime,
} from '../actions/exerciseActions'
import TypedCard from '../components/TypedCard'
import Counter from '../components/Counter'
import Timer from '../components/Timer'

const ExerciseTypedScreen = ({ match, history }) => {
  const [answer, setAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [wordsNumber, setWordsNumber] = useState(1)
  const [start, setStart] = useState(false)
  const [goodAnswers, setGoodAnswers] = useState(0)
  const [badAnswers, setBadAnswers] = useState(0)
  const [time, setTime] = useState(0)
  const dispatch = useDispatch()

  const exerciseDetails = useSelector((state) => state.exerciseDetails)
  const { exercise } = exerciseDetails

  const wordDraw = useSelector((state) => state.wordDraw)
  const { error, loading, words } = wordDraw

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listExerciseDetails(match.params.id))
    }
  }, [dispatch, userInfo, history, match.params.id])

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
      setGoodAnswers(goodAnswers + 1)
      setCorrectAnswer(true)
    } else {
      dispatch(addWrongAnswerExercise(exercise))
      dispatch(addWrongAnswerWord(words[0]))
      setBadAnswers(badAnswers + 1)
      setCorrectAnswer(false)
    }
    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      dispatch(updateExerciseTime(exercise, time))
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 1800)
    }
    setAnswer('')
  }

  const nextCardHandler = (e) => {
    e.preventDefault()
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setCorrectAnswer(null)
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
            <Col xs={12} md={7}>
              <Row>
                <Counter
                  correctAnswers={goodAnswers}
                  wrongAnswers={badAnswers}
                  totalAnswers={exercise.words_num}
                />
              </Row>
              <ProgressBar className="my-3">
                <ProgressBar
                  animated
                  variant="success"
                  now={(goodAnswers / exercise.words_num) * 100}
                  key={1}
                />
                <ProgressBar
                  animated
                  variant="warning"
                  now={(badAnswers / exercise.words_num) * 100}
                  key={2}
                />
              </ProgressBar>
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
                <div className="text-center">
                  <Button
                    type="submit"
                    variant={`success my-3 float-start ${
                      correctAnswer !== null ? 'disabled' : ''
                    }`}
                  >
                    CONFIRM
                  </Button>
                  <Timer setTime={setTime} time={time} />
                  <Button
                    type="submit"
                    variant={`primary my-3 float-end ${
                      correctAnswer === null ||
                      wordsNumber - 1 === exercise.words_num
                        ? 'disabled'
                        : ''
                    }`}
                    onClick={nextCardHandler}
                  >
                    NEXT
                  </Button>
                </div>
              </Form>
              {correctAnswer === true && (
                <Message variant="success">CORRECT ANSWER</Message>
              )}
              {correctAnswer === false && (
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
