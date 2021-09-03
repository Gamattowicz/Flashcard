import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Category from '../components/Category'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCategories } from '../actions/categoryActions'
import Paginate from '../components/Paginate'

const CategoryListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList)
  const { error, loading, categories, pages, page } = categoryList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listCategories(keyword))
  }, [dispatch, history, keyword])

  return (
    <div>
      <h1>Categories</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {categories.map((category) => (
              <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
                <Category category={category} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} path={'/category'} />
        </div>
      )}
    </div>
  )
}

export default CategoryListScreen
