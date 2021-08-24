import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Deck from '../components/Deck'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listDecks } from '../actions/deckActions'

const DecksListScreen = () => {
  const dispatch = useDispatch()
  const deckList = useSelector((state) => state.deckList)
  const { error, loading, decks } = deckList

  useEffect(() => {
    dispatch(listDecks())
  }, [dispatch])

  return (
    <div>
      <h1>DECKS</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {decks.map((deck) => (
            <Col key={deck.id} sm={12} md={6} lg={4} xl={3}>
              <Deck deck={deck} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default DecksListScreen
