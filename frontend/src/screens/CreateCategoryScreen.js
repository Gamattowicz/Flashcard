import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createCategory } from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import { ChromePicker } from 'react-color'

const CreateCategoryScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#fff')
  const [showColorPicker, setShowColorPicker] = useState(true)

  const dispatch = useDispatch()

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { error, loading, success } = categoryCreate

  useEffect(() => {
    if (success) {
      setName('')
      setColor('')
      dispatch({ type: CATEGORY_CREATE_RESET })
      history.push('/category')
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory(name, color))
  }

  return (
    <FormContainer>
      <Row>
        <Col md={8}>
          <h1>CREATE NEW CATEGORY</h1>
        </Col>
        <Col md={4} className="align-self-center">
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

      <Form onSubmit={submitHandler}>
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
            onClick={() =>
              setShowColorPicker((showColorPicker) => !showColorPicker)
            }
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

        <Button type="submit" variant="primary mt-3">
          CREATE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CreateCategoryScreen
