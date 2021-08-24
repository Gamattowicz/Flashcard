import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createDeck } from '../actions/deckActions'
import { DECK_CREATE_RESET } from '../constants/deckConstants'

const CreateDeckScreen = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const deckCreate = useSelector((state) => state.deckCreate)
  const { error, loading, success } = deckCreate

  useEffect(() => {
    if (success) {
      setName('')
      dispatch({ type: DECK_CREATE_RESET })
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createDeck(name))
  }

  return (
    <FormContainer>
      <h1>CREATE NEW DECK</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter deck name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary mt-3">
          CREATE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default CreateDeckScreen
