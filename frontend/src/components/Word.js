import React, { useState } from 'react'
import { Card, Row, Col, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteWord } from '../actions/wordActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Word = ({ word }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const dispatch = useDispatch()

  const wordDelete = useSelector((state) => state.wordDelete)
  const { error, loading } = wordDelete

  const deleteHandler = () => {
    dispatch(deleteWord(word.id))
    handleClose()
  }

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Card className="my-3 p-3 rounded text-center">
        <Row>
          <Col md={8}>
            <Link to={`/words/${word.id}`}>{word.question}</Link>
          </Col>
          <Col md={2}>
            <i class="fas fa-edit text-primary"></i>
          </Col>
          <Col md={2}>
            <i class="fas fa-trash text-warning" onClick={handleShow}></i>
            <Link to={`/words/${word.id}/delete`}></Link>
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
      </Card>
    </>
  )
}

export default Word
