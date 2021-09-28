import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Col, Container, ProgressBar, Row} from 'react-bootstrap'
import {addCorrectAnswerWord, addExerciseWord, addWrongAnswerWord, drawWord,} from '../actions/wordActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
    addCorrectAnswerExercise,
    addWrongAnswerExercise,
    listExerciseDetails,
    updateExerciseTime,
} from '../actions/exerciseActions'
import Flashcard from '../components/Flashcard'
import Counter from '../components/Counter'
import Timer from '../components/Timer'

const ExerciseReversedScreen = ({ match, history }) => {
  const [wordsNumber, setWordsNumber] = useState(1)
  const [start, setStart] = useState(false)
  const [reversed, setReversed] = useState(false)
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
  }, [dispatch, userInfo, history, exercise.correct_answers])

  const startHandler = (e) => {
    e.preventDefault()
    setStart(true)
    dispatch(drawWord(exercise))
  }

  const badAnswer = (e) => {
    e.preventDefault()
    dispatch(addWrongAnswerExercise(exercise))
    dispatch(addWrongAnswerWord(words[0]))
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    setBadAnswers(badAnswers + 1)
    if (wordsNumber === exercise.words_num) {
      dispatch(updateExerciseTime(exercise, time))
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 800)
    }
  }

  const goodAnswer = (e) => {
    e.preventDefault()
    dispatch(addCorrectAnswerExercise(exercise))
    dispatch(addCorrectAnswerWord(words[0]))
    dispatch(addExerciseWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    setGoodAnswers(goodAnswers + 1)
    if (wordsNumber === exercise.words_num) {
      dispatch(updateExerciseTime(exercise, time))
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
              <Counter
                correctAnswers={goodAnswers}
                wrongAnswers={badAnswers}
                totalAnswers={exercise.words_num}
              />
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
                  <Flashcard
                    key={word.id}
                    word={words[0]}
                    setReversed={setReversed}
                    reversed={reversed}
                  />
                ))}
              <div className="text-center">
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
                <Timer setTime={setTime} time={time} />
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
              </div>
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
