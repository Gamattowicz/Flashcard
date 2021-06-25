import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { drawWord } from "../actions/wordActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const DrawWordScreen = () => {
  const [definition, setDefinition] = useState("");
  const dispatch = useDispatch();
  const wordDraw = useSelector((state) => state.wordDraw);
  const { error, loading, words } = wordDraw;

  useEffect(() => {
    dispatch(drawWord());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (definition === words[0].definition) {
      console.log("CORRECT");
      dispatch(drawWord());
    } else {
      console.log("WRONG");
      dispatch(drawWord());
    }
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

            <Button type="submit" variant="primary mt-3">
              CONFIRM
            </Button>
          </Form>
        </Col>
      )}
    </div>
  );
};

export default DrawWordScreen;
