import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { listDeckDetails } from '../actions/deckActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listWordsDeck } from '../actions/wordActions'
import Paginate from '../components/Paginate'

const DeckScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const deckDetails = useSelector((state) => state.deckDetails)
  const { error, loading, deck } = deckDetails

  const wordListDeck = useSelector((state) => state.wordListDeck)
  const { loadingWords, errorWords, words, pages, page } = wordListDeck

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listDeckDetails(match.params.id))
    dispatch(listWordsDeck(keyword, match.params.id))
  }, [dispatch, history, keyword])

  return (
    <div>
      <Link to="/decks" className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
      {loading || loadingWords ? (
        <Loader />
      ) : error || errorWords ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col md={7}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={2} className="align-self-center">
                    <strong>Name</strong>
                  </Col>
                  <Col md={10} className="text-center">
                    {deck.name}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={2} className="align-self-center">
                    <strong>Word list</strong>
                  </Col>
                  <Col md={10} className="text-center">
                    <ListGroup variant="flush">
                      {words &&
                        words.map((word) => (
                          <ListGroup.Item action className="my-1" key={word.id}>
                            <Link to={`/words/${word.id}`}>
                              {word.question}
                            </Link>
                          </ListGroup.Item>
                        ))}
                      <Paginate
                        pages={pages}
                        page={page}
                        path={`/decks/${match.params.id}`}
                      />
                    </ListGroup>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  )
}

export default DeckScreen
