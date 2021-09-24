import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import User from '../components/User'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUsers} from '../actions/userActions'
import Paginate from '../components/Paginate'

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { error, loading, users, pages, page } = userList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listUsers(keyword))
  }, [dispatch, history, keyword])

  return (
    <>
      <h1>Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {users.length <= 0 && (
              <div>
                <h3 className="text-warning fw-bold text-center text-uppercase">
                  No users
                </h3>
              </div>
            )}
            {users.map((user) => (
              <Col key={user.id} sm={12} md={6} lg={4} xl={3}>
                <User user={user} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} path={'/admin/usersList'} />
        </>
      )}
    </>
  )
}

export default UsersListScreen
