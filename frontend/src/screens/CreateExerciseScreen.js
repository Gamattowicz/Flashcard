import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {createExercise} from '../actions/exerciseActions'
import {EXERCISE_CREATE_RESET} from '../constants/exerciseConstants'
import {listDecks} from '../actions/deckActions'

const CreateExerciseScreen = ({ history }) => {
  const [wordNumber, setWordNumber] = useState(0)
  const [correctAnswers] = useState(0)
  const [wrongAnswers] = useState(0)
  const [deck, setDeck] = useState('')
  const [mode, setMode] = useState('')

  const dispatch = useDispatch()

  const exerciseCreate = useSelector((state) => state.exerciseCreate)
  const { error, loading, success, exerciseInfo } = exerciseCreate

  const deckList = useSelector((state) => state.deckList)
  const { decks } = deckList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listDecks())
    }
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
  }, [dispatch, history, userInfo, success, mode])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createExercise(deck, { wordNumber, correctAnswers, wrongAnswers }))
  }

  return (
    <FormContainer>
      <Row>
        <Col xs={8}>
          <h1>CREATE NEW EXERCISE</h1>
        </Col>
        <Col xs={4} className="align-self-center">
          <Link
            to={`/exercises/`}
            className="btn btn-outline-primary text-uppercase fw-bold float-end"
          >
            Exercise list
          </Link>
        </Col>
      </Row>
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
            required
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
            required
            as="select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="reversed">Reversed card</option>
            <option value="typed">Type in the answer</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary my-3">
          CREATE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CreateExerciseScreen
