import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card, Col, Modal, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {deleteCategory} from '../actions/categoryActions'
import {CATEGORY_DELETE_RESET} from '../constants/categoryConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Category = ({ category }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const categoryDelete = useSelector((state) => state.categoryDelete)
  const { error, loading, success } = categoryDelete

  useEffect(() => {
    if (success) {
      window.location.reload()
      dispatch({ type: CATEGORY_DELETE_RESET })
    }
  }, [success])

  const deleteHandler = () => {
    dispatch(deleteCategory(category.id))
    handleClose()
  }

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Card
        className="my-3 p-3 rounded text-center"
        style={{ backgroundColor: category.color }}
      >
        <Row>
          <Col md={8}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </Col>
          {userInfo.is_admin && (
            <>
              <Col md={2}>
                <Link to={`/category/${category.id}/update`}>
                  <i class="fas fa-edit text-primary"></i>
                </Link>
              </Col>
              <Col md={2}>
                <i class="fas fa-trash text-warning" onClick={handleShow}></i>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Delete category</Modal.Title>
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
                    Are you sure you want to remove category "{category.name}"?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="warning" onClick={deleteHandler}>
                      Delete category
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </>
  )
}

export default Category
