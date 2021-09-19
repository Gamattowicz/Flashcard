import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listDeckDetails, updateDeck} from '../actions/deckActions'
import {DECK_UPDATE_RESET} from '../constants/deckConstants'

const DeckUpdateScreen = ({ match, history }) => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const deckDetails = useSelector((state) => state.deckDetails)
  const { error, loading, deck } = deckDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deckUpdate = useSelector((state) => state.deckUpdate)
  const { success } = deckUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!deck || !deck.name || success) {
        dispatch({ type: DECK_UPDATE_RESET })
        dispatch(listDeckDetails(match.params.id))
      } else {
        setName(deck.name)
      }
    }
  }, [dispatch, history, userInfo, deck, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateDeck({ id: deck.id, name: name }))
  }

  return (
    <FormContainer>
      <Row>
        <Col md={8}>
          <h1>UPDATE DECK</h1>
        </Col>
        <Col md={4} className="align-self-center">
          <Link
            to={`/decks/`}
            className="btn btn-outline-primary text-uppercase fw-bold float-end"
          >
            Deck list
          </Link>
        </Col>
      </Row>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            required
            type="text"
            placeholder="Enter deck name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary mt-3">
          UPDATE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default DeckUpdateScreen
