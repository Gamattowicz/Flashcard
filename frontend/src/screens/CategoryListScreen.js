import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import Category from '../components/Category'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listCategories} from '../actions/categoryActions'
import Paginate from '../components/Paginate'

const CategoryListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList)
  const { error, loading, categories, pages, page } = categoryList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let keyword = history.location.search

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listCategories(keyword))
    }
  }, [dispatch, userInfo, history, keyword])

  return (
    <>
      <h1>Categories</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {categories.length <= 0 && (
              <div>
                <h3 className="text-warning fw-bold text-center text-uppercase">
                  No categories
                </h3>
              </div>
            )}
            {categories.map((category) => (
              <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
                <Category category={category} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} path={'/category'} />
        </>
      )}
    </>
  )
}

export default CategoryListScreen
