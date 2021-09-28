import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import Deck from '../components/Deck'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listAllDecks} from '../actions/deckActions'
import Paginate from '../components/Paginate'

const DecksAllListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const deckAllList = useSelector((state) => state.deckAllList)
  const { error, loading, decks, pages, page } = deckAllList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let keyword = history.location.search

  useEffect(() => {
    if (!userInfo.is_admin) {
      history.push('/login')
    } else {
      dispatch(listAllDecks(keyword))
    }
  }, [dispatch, history, userInfo, keyword])

  return (
    <>
      <h1>All Decks</h1>

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
          <Paginate pages={pages} page={page} path={'/admin/decks'} />
        </>
      )}
    </>
  )
}

export default DecksAllListScreen
