import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card, Col, Modal, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {deleteUser} from '../actions/userActions'
import {USER_DELETE_RESET} from '../constants/userConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const User = ({ user }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const dispatch = useDispatch()

  const userDelete = useSelector((state) => state.userDelete)
  const { error, loading, success } = userDelete

  useEffect(() => {
    if (success) {
      window.location.reload()
      dispatch({ type: USER_DELETE_RESET })
    }
  }, [success])

  const deleteHandler = () => {
    dispatch(deleteUser(user.id))
    handleClose()
  }

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Card className="my-3 p-3 rounded">
        <Row>
          <Col md={8}>
            <Link to={`/admin/user/${user.id}`}>{user.username}</Link>
          </Col>
          <Col md={2}>
            <Link to={`/admin/user/${user.id}/update`}>
              <i class="fas fa-edit text-primary"></i>
            </Link>
          </Col>
          <Col md={2}>
            <i class="fas fa-trash text-warning" onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Delete user</Modal.Title>
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
                Are you sure you want to remove user "{user.username}"?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="warning" onClick={deleteHandler}>
                  Delete user
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default User
