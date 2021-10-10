import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Col, ListGroup, Row} from 'react-bootstrap'
import {listUserDetails} from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.is_admin) {
      history.push('/login')
    } else {
      dispatch(listUserDetails(match.params.id))
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

              <ListGroup.Item>
                <Row>
                  <Col md={4} className="align-self-center">
                    <strong>Last login</strong>
                  </Col>
                  <Col md={8} className="text-center">
                    {user.last_login && user.last_login}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={4} className="align-self-center">
                    <strong>Date joined</strong>
                  </Col>
                  <Col md={8} className="text-center">
                    {user.date_joined}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={4} className="align-self-center">
                    <strong>Admin</strong>
                  </Col>
                  <Col md={8} className="text-center">
                    {user.is_admin ? `Yes` : `No`}
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
