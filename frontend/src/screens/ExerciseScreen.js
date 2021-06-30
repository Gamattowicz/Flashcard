import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import {
  drawWord,
  addExerciseWord,
  addCorrectAnswerWord,
  addWrongAnswerWord,
} from "../actions/wordActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ExerciseScreen = () => {
  const [definition, setDefinition] = useState("");
  const [answer, setAnswer] = useState(null);
  const dispatch = useDispatch();

  const wordDraw = useSelector((state) => state.wordDraw);
  const { error, loading, words } = wordDraw;

  useEffect(() => {
    dispatch(drawWord());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (definition.toUpperCase() === words[0].definition.toUpperCase()) {
      dispatch(addCorrectAnswerWord(words[0]));
      setAnswer(true);
    } else {
      dispatch(addWrongAnswerWord(words[0]));
      setAnswer(false);
    }
    dispatch(addExerciseWord(words[0]));
    dispatch(drawWord());
    setDefinition("");
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Name</strong>
                  </Col>
                  {words[0] &&
                    words.map((word) => <Col key={word.id}>{word.name}</Col>)}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Category</strong>
                  </Col>
                  {words[0] &&
                    words.map((word) => (
                      <Col key={word.id}>{word.category}</Col>
                    ))}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Deck</strong>
                  </Col>
                  {words[0] &&
                    words.map((word) => <Col key={word.id}>{word.deck}</Col>)}
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary my-3">
              CONFIRM
            </Button>
          </Form>
          {answer !== null ? (
            answer ? (
              <Message variant="success">CORRECT ANSWER</Message>
            ) : (
              <Message variant="danger">WRONG ANSWER</Message>
            )
          ) : (
            ""
          )}
        </Col>
      )}
    </div>
  );
};

export default ExerciseScreen;