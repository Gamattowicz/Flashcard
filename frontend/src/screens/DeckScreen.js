import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Col, ListGroup, Row} from 'react-bootstrap'
import {listDeckDetails} from '../actions/deckActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listWordsDeck} from '../actions/wordActions'
import Paginate from '../components/Paginate'

const DeckScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const deckDetails = useSelector((state) => state.deckDetails)
  const { error, loading, deck } = deckDetails

  const wordListDeck = useSelector((state) => state.wordListDeck)
  const { loadingWords, errorWords, words, pages, page } = wordListDeck

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let keyword = history.location.search

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listDeckDetails(match.params.id))
      dispatch(listWordsDeck(keyword, match.params.id))
    }
  }, [dispatch, history, userInfo, keyword, match.params.id])

  return (
    <div>
      <Link onClick={history.goBack} className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
      {loading || loadingWords ? (
        <Loader />
      ) : error || errorWords ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col xs={12} md={8}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col xs={4} className="align-self-center">
                    <strong>Name</strong>
                  </Col>
                  <Col xs={8} className="text-center">
                    {deck.name}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col xs={4} className="align-self-center">
                    <strong>Word list</strong>
                  </Col>
                  <Col xs={8} className="text-center">
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
