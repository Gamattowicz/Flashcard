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
import Flashcard from '../components/Flashcard'

const ExerciseReversedScreen = ({ match, history }) => {
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
      }, 500)
    }
  }

  const goodAnswer = (e) => {
    e.preventDefault()
    console.log('works')
    dispatch(addWrongAnswerExercise(exercise))
    dispatch(addCorrectAnswerExercise(exercise))
    dispatch(addCorrectAnswerWord(words[0]))
    dispatch(drawWord(exercise))
    setWordsNumber(wordsNumber + 1)
    if (wordsNumber === exercise.words_num) {
      setTimeout(() => {
        history.push(`/exercises/${exercise.id}/end`)
      }, 500)
    }
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
              </Card>

              {words[0] &&
                words.map((word) => (
                  <Flashcard key={word.id} word={words[0]} />
                ))}

              <Button
                variant="warning my-3"
                className="float-start"
                onClick={badAnswer}
              >
                BAD
              </Button>

              <Button
                variant="success my-3"
                className="float-end"
                onClick={goodAnswer}
              >
                GOOD
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default ExerciseReversedScreen
