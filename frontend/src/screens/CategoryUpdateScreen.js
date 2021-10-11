import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listCategoryDetails, updateCategory} from '../actions/categoryActions'
import {CATEGORY_UPDATE_RESET} from '../constants/categoryConstants'
import {ChromePicker} from 'react-color'

const CategoryUpdateScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#fff')
  const [showColorPicker, setShowColorPicker] = useState(true)

  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { error, loading, success, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { success: successCategoryUpdate } = categoryUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.is_admin) {
      history.push('/login')
    } else {
      if (successCategoryUpdate) {
        dispatch({ type: CATEGORY_UPDATE_RESET })
        setLoaded(false)
        history.push('/category')
      } else {
        if (!success || !loaded) {
          dispatch(listCategoryDetails(match.params.id))
          setLoaded(true)
        } else {
          setName(category.name)
          setColor(category.color)
        }
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    category,
    success,
    successCategoryUpdate,
    loaded,
    match.params.id,
  ])

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateCategory({ id: category.id, name, color }))
  }

  return (
    <FormContainer>
      <Row>
        <Col xs={8}>
          <h1>UPDATE CATEGORY</h1>
        </Col>
        <Col xs={4} className="align-self-center">
          <Link
            to={`/category/`}
            className="btn btn-outline-primary text-uppercase fw-bold float-end"
          >
            Category list
          </Link>
        </Col>
      </Row>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="color">
          <Button
            type="submit"
            variant="warning my-3"
            onClick={(e) => {
              e.preventDefault()
              setShowColorPicker((showColorPicker) => !showColorPicker)
            }}
          >
            {showColorPicker ? 'Close color picker' : 'Pick a color'}
          </Button>
          {showColorPicker && (
            <ChromePicker
              color={color}
              onChange={(updatedColor) => setColor(updatedColor.hex)}
            />
          )}
        </Form.Group>

        <Button type="submit" variant="primary mt-3" onClick={updateHandler}>
          UPDATE
        </Button>
      </Form>
    </FormContainer>
  )
}
export default CategoryUpdateScreen
