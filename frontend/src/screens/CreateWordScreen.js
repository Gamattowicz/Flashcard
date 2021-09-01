import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createWord } from '../actions/wordActions'
import { WORD_CREATE_RESET } from '../constants/wordConstants'
import { listCategories } from '../actions/categoryActions'
import { listDecks } from '../actions/deckActions'

const CreateWordScreen = ({ history }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [category, setCategory] = useState('')
  const [deck, setDeck] = useState('')

  const dispatch = useDispatch()

  const wordCreate = useSelector((state) => state.wordCreate)
  const { error, loading, success } = wordCreate

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const deckList = useSelector((state) => state.deckList)
  const { decks } = deckList

  useEffect(() => {
    dispatch(listCategories())
    dispatch(listDecks())
    if (success) {
      setQuestion('')
      setAnswer('')
      setCategory('')
      setDeck('')
      dispatch({ type: WORD_CREATE_RESET })
      history.push('/words')
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createWord(category, deck, { question, answer }))
  }

  return (
    <FormContainer>
      <h1>CREATE NEW WORD</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Question</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
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

        <Button type="submit" variant="primary mt-3">
          CREATE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CreateWordScreen
