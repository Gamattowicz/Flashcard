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
  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch()

  const deckDetails = useSelector((state) => state.deckDetails)
  const { error, loading, deck, success } = deckDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deckUpdate = useSelector((state) => state.deckUpdate)
  const { success: successDeckUpdate } = deckUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successDeckUpdate) {
      dispatch({ type: DECK_UPDATE_RESET })
      setLoaded(false)
      history.push('/decks')
    } else {
      if (!success || !loaded) {
        dispatch(listDeckDetails(match.params.id))
        setLoaded(true)
      } else {
        setName(deck.name)
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    deck,
    success,
    successDeckUpdate,
    loaded,
    match.params.id,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateDeck({ id: deck.id, name: name }))
  }

  return (
    <FormContainer>
      <Row>
        <Col xs={8}>
          <h1>UPDATE DECK</h1>
        </Col>
        <Col xs={4} className="align-self-center">
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
