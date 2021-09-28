import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {createWord} from '../actions/wordActions'
import {WORD_CREATE_RESET} from '../constants/wordConstants'
import {listCategories} from '../actions/categoryActions'
import {listDecks} from '../actions/deckActions'

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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listCategories())
      dispatch(listDecks())
    }
    if (success) {
      setQuestion('')
      setAnswer('')
      setCategory('')
      setDeck('')
      dispatch({ type: WORD_CREATE_RESET })
      history.push('/words')
    }
  }, [dispatch, history, userInfo, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createWord(category, deck, { question, answer }))
  }

  return (
    <FormContainer>
      <Row>
        <Col md={8}>
          <h1>CREATE NEW WORD</h1>
        </Col>
        <Col md={4} className="align-self-center">
          <Link
            to={`/words/`}
            className="btn btn-outline-primary text-uppercase fw-bold float-end"
          >
            Word list
          </Link>
        </Col>
      </Row>

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
