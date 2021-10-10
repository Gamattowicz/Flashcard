import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Modal, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteDeck} from '../actions/deckActions'
import {DECK_DELETE_RESET} from '../constants/deckConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Deck = ({ deck }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const dispatch = useDispatch()

  const deckDelete = useSelector((state) => state.deckDelete)
  const { error, loading, success } = deckDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (success) {
      window.location.reload()
      dispatch({ type: DECK_DELETE_RESET })
    }
  }, [success, dispatch])

  const deleteHandler = () => {
    dispatch(deleteDeck(deck.id))
    handleClose()
  }

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Card className="my-3 p-3 rounded text-start">
        <Row>
          <Col md={8}>
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </Col>
          <Col md={2}>
            <Link to={`/decks/${deck.id}/update`}>
              <i class="fas fa-edit text-primary"></i>
            </Link>
          </Col>
          <Col md={2}>
            <i class="fas fa-trash text-warning" onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Delete deck</Modal.Title>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true"></span>
                </button>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to remove deck "{deck.name}"?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="warning" onClick={deleteHandler}>
                  Delete deck
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        {userInfo.is_admin && (
          <Row>
            <Link to={`/admin/user/${deck.user_id}`}>
              <small className="text-start">User: {deck.user_name}</small>
            </Link>
          </Row>
        )}
      </Card>
    </>
  )
}

export default Deck
