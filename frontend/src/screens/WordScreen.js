import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Col, ListGroup, Row} from 'react-bootstrap'
import {listWordDetails} from '../actions/wordActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const WordScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const wordDetails = useSelector((state) => state.wordDetails)
  const { error, loading, word } = wordDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listWordDetails(match.params.id))
    }
  }, [dispatch, userInfo, history, match.params.id])

  return (
    <div>
      <Link onClick={history.goBack} className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col md={8}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={2} className="align-self-center">
                    <strong>Question</strong>
                  </Col>
                  <Col md={10} className="text-center">
                    {word.question}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={2} className="align-self-center">
                    <strong>Answer</strong>
                  </Col>
                  <Col md={10} className="text-center">
                    {word.answer}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={2} className="align-self-center text-success">
                    <strong>Correct answers</strong>
                  </Col>
                  <Col md={4} className="text-center text-success">
                    {word.correct_answers}
                  </Col>
                  <Col md={2} className="align-self-center text-warning">
                    <strong>Wrong answers</strong>
                  </Col>
                  <Col md={4} className="text-center text-warning">
                    {word.wrong_answers}
                  </Col>
                </Row>
              </ListGroup.Item>

              <Card.Footer className="text-muted">
                <Row>
                  <Col md={2}>
                    <strong>Category</strong>
                  </Col>
                  <Col md={4} className="text-center">
                    <Link
                      to={`/category/${word.category_id}`}
                      style={{ color: '#839496' }}
                      className="fst-italic fw-lighter"
                    >
                      {word.category}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <strong>Deck</strong>
                  </Col>
                  <Col md={4} className="text-center">
                    <Link
                      to={`/decks/${word.deck_id}`}
                      style={{ color: '#839496' }}
                      className="fst-italic fw-lighter"
                    >
                      {word.deck}
                    </Link>
                  </Col>
                </Row>
              </Card.Footer>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  )
}

export default WordScreen
