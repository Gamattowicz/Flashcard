import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Modal, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteWord} from '../actions/wordActions'
import {WORD_DELETE_RESET} from '../constants/wordConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Word = ({ word }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const dispatch = useDispatch()

  const wordDelete = useSelector((state) => state.wordDelete)
  const { error, loading, success } = wordDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (success) {
      window.location.reload()
      dispatch({ type: WORD_DELETE_RESET })
    }
  }, [success])

  const deleteHandler = () => {
    dispatch(deleteWord(word.id))
    handleClose()
  }

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Card className="my-3 p-3 rounded text-start">
        <Row>
          <Col md={8}>
            <Link to={`/words/${word.id}`}>{word.question}</Link>
          </Col>
          <Col md={2}>
            <Link to={`/words/${word.id}/update`}>
              <i class="fas fa-edit text-primary"></i>
            </Link>
          </Col>
          <Col md={2}>
            <i class="fas fa-trash text-warning" onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Delete word</Modal.Title>
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
                Are you sure you want to remove word "{word.question}"?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="warning" onClick={deleteHandler}>
                  Delete word
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        {userInfo.is_admin && (
          <Row>
            <Link to={`/admin/user/${word.user_id}`}>
              <small className="text-start">User: {word.user_name}</small>
            </Link>
          </Row>
        )}
      </Card>
    </>
  )
}

export default Word
