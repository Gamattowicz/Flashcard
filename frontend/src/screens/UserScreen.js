import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { listUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  useEffect(() => {
    dispatch(listUserDetails(match.params.id))
  }, [dispatch])

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
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="align-self-center">
                    <strong>Username</strong>
                  </Col>
                  <Col md={8} className="text-center">
                    {user.username}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={4} className="align-self-center">
                    <strong>Email</strong>
                  </Col>
                  <Col md={8} className="text-center">
                    {user.email}
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

export default UserScreen
