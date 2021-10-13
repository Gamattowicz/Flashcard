import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Col, ListGroup, Row} from 'react-bootstrap'
import {listCategoryDetails} from '../actions/categoryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CategoryScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { error, loading, category } = categoryDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listCategoryDetails(match.params.id))
    }
  }, [dispatch, history, userInfo, match.params.id])

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
        <Col xs={12} md={8}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col xs={5} md={2} className="align-self-center">
                    <strong>Name</strong>
                  </Col>
                  <Col xs={7} md={10} className="text-center">
                    {category.name}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col xs={5} md={2} className="align-self-center">
                    <strong>Color</strong>
                  </Col>
                  <Col
                    xs={7}
                    md={10}
                    className="text-center"
                    style={{ backgroundColor: category.color }}
                  ></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  )
}

export default CategoryScreen
