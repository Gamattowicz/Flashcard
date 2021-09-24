import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import Deck from '../components/Deck'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listDecks} from '../actions/deckActions'
import Paginate from '../components/Paginate'

const DecksListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const deckList = useSelector((state) => state.deckList)
  const { error, loading, decks, pages, page } = deckList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listDecks(keyword))
  }, [dispatch, history, keyword])

  return (
    <>
      <h1>Decks</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {decks.length <= 0 && (
              <div>
                <h3 className="text-warning fw-bold text-center text-uppercase">
                  No decks
                </h3>
              </div>
            )}
            {decks.map((deck) => (
              <Col key={deck.id} sm={12} md={6} lg={4} xl={3}>
                <Deck deck={deck} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} path={'/decks'} />
        </>
      )}
    </>
  )
}

export default DecksListScreen
