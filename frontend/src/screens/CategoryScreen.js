import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { listCategoryDetails } from '../actions/categoryActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CategoryScreen = ({ match }) => {
  const dispatch = useDispatch()
  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { error, loading, category } = categoryDetails

  useEffect(() => {
    dispatch(listCategoryDetails(match.params.id))
  }, [dispatch])

  return (
    <div>
      <Link to="/category" className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={5} className="align-self-center">
                    <strong>Name</strong>
                  </Col>
                  <Col md={7} className="text-center">
                    {category.name}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={5} className="align-self-center">
                    <strong>Color</strong>
                  </Col>
                  <Col
                    md={7}
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
