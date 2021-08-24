import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createExercise } from '../actions/exerciseActions'
import { EXERCISE_CREATE_RESET } from '../constants/exerciseConstants'
import { listDecks } from '../actions/deckActions'

const CreateExerciseScreen = ({ history }) => {
  const [wordNumber, setWordNumber] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [deck, setDeck] = useState('')
  const [mode, setMode] = useState('')

  const dispatch = useDispatch()

  const exerciseCreate = useSelector((state) => state.exerciseCreate)
  const { error, loading, success, exerciseInfo } = exerciseCreate

  const deckList = useSelector((state) => state.deckList)
  const { decks } = deckList

  useEffect(() => {
    dispatch(listDecks())
    if (success) {
      setWordNumber(0)
      setDeck('')
      dispatch({ type: EXERCISE_CREATE_RESET })
      if (mode === 'reversed') {
        history.push(`/exercises/${exerciseInfo.id}/update/reversed`)
      } else if (mode === 'typed') {
        history.push(`/exercises/${exerciseInfo.id}/update/typed`)
      }
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createExercise(deck, { wordNumber, correctAnswers, wrongAnswers }))
  }

  return (
    <FormContainer>
      <h1>CREATE NEW EXERCISE</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="wordNumber">
          <Form.Label>Number of word</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Choose number of word"
            value={wordNumber}
            onChange={(e) => setWordNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="deck">
          <Form.Label>Deck</Form.Label>
          <Form.Control
            as="select"
            value={deck}
            onChange={(e) => setDeck(e.target.value)}
          >
            <option value="">Select...</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="mode">
          <Form.Label>Mode</Form.Label>
          <Form.Control
            as="select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="reversed">Reversed card</option>
            <option value="typed">Type in the answer</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary mt-3">
          START
        </Button>
      </Form>
      <Link to={`/exercises/`}>Exercises list</Link>
    </FormContainer>
  )
}

export default CreateExerciseScreen
