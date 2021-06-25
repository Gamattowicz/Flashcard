import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createWord } from "../actions/wordActions";
import { WORD_CREATE_RESET } from "../constants/wordConstants";
import { listCategories } from "../actions/categoryActions";
import { listDecks } from "../actions/deckActions";

const CreateWordScreen = () => {
  const [name, setName] = useState("");
  const [definition, setDefinition] = useState("");
  const [category, setCategory] = useState("");
  const [deck, setDeck] = useState("");

  const dispatch = useDispatch();

  const wordCreate = useSelector((state) => state.wordCreate);
  const { error, loading, success } = wordCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const deckList = useSelector((state) => state.deckList);
  const { decks } = deckList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listDecks());
    if (success) {
      setName("");
      setDefinition("");
      setCategory("");
      setDeck("");
      dispatch({ type: WORD_CREATE_RESET });
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createWord(category, deck, { name, definition }));
  };

  return (
    <FormContainer>
      <h1>CREATE NEW WORD</h1>
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

        <Form.Group controlId="definition">
          <Form.Label>Definition</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="deck">
          <Form.Label>Deck</Form.Label>
          <Form.Control
            as="select"
            value={deck}
            onChange={(e) => setDeck(e.target.value)}
          >
            <option value="">Select...</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submmit" variant="primary mt-3">
          CREATE
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateWordScreen;
