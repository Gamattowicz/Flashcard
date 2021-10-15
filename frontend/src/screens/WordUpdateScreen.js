import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listWordDetails, updateWord} from '../actions/wordActions'
import {WORD_UPDATE_RESET} from '../constants/wordConstants'
import {listCategories} from '../actions/categoryActions'
import {listDecks} from '../actions/deckActions'

const WordUpdateScreen = ({ match, history }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [category, setCategory] = useState('')
  const [deck, setDeck] = useState('')
  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch()

  const wordDetails = useSelector((state) => state.wordDetails)
  const { error, loading, success, word } = wordDetails

  const wordUpdate = useSelector((state) => state.wordUpdate)
  const { success: successWordUpdate } = wordUpdate

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const deckList = useSelector((state) => state.deckList)
  const { decks } = deckList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successWordUpdate) {
      dispatch({ type: WORD_UPDATE_RESET })
      setLoaded(false)
      history.push('/words')
    } else {
      if (!success || !loaded) {
        dispatch(listCategories())
        dispatch(listDecks())
        dispatch(listWordDetails(match.params.id))
        setLoaded(true)
      } else {
        setQuestion(word.question)
        setAnswer(word.answer)
        setCategory(word.category)
        setDeck(word.deck)
      }
    }
  }, [
    dispatch,
    userInfo,
    history,
    word,
    success,
    successWordUpdate,
    loaded,
    match.params.id,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateWord({
        id: word.id,
        question,
        answer,
        category: category,
        deck: deck,
      })
    )
  }

  return (
    <FormContainer>
      <Row>
        <Col xs={8}>
          <h1>UPDATE WORD</h1>
        </Col>
        <Col xs={4} className="align-self-center">
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
              <option key={category.id} value={category.name}>
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
              <option key={deck.id} value={deck.name}>
                {deck.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary mt-3">
          UPDATE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default WordUpdateScreen
