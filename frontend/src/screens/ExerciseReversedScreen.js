import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, ProgressBar, Container } from 'react-bootstrap'
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
import Flashcard from '../components/Flashcard'

const ExerciseReversedScreen = ({ match, history }) => {
  const [wordsNumber, setWordsNumber] = useState(1)
  const [start, setStart] = useState(false)
  const [reversed, setReversed] = useState(false)
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

  const badAnswer = (e) => {
    e.preventDefault()
    console.log('not works')
    dispatch(addWrongAnswerExercise(exercise))
    dispatch(addWrongAnswerWord(words[0]))
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 800)
    }
  }

  const goodAnswer = (e) => {
    e.preventDefault()
    console.log('works')
    dispatch(addCorrectAnswerExercise(exercise))
    dispatch(addCorrectAnswerWord(words[0]))
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 800)
    }
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
                  <Flashcard
                    key={word.id}
                    word={words[0]}
                    setReversed={setReversed}
                    reversed={reversed}
                  />
                ))}

              <Button
                variant="warning my-3"
                className={`float-start ${
                  wordsNumber === exercise.words_num + 1 || reversed
                    ? 'disabled'
                    : ''
                }`}
                onClick={badAnswer}
              >
                BAD
              </Button>

              <Button
                variant="success my-3"
                className={`float-end ${
                  wordsNumber === exercise.words_num + 1 || reversed
                    ? 'disabled'
                    : ''
                }`}
                onClick={goodAnswer}
              >
                GOOD
              </Button>
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

export default ExerciseReversedScreen
