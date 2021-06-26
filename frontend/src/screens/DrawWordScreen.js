import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import { drawWord, addExerciseWord } from "../actions/wordActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const DrawWordScreen = () => {
  const [definition, setDefinition] = useState("");
  const [answer, setAnswer] = useState(null);
  const dispatch = useDispatch();

  const wordDraw = useSelector((state) => state.wordDraw);
  const { error, loading, words } = wordDraw;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(drawWord());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addExerciseWord(words[0]));
    console.log(words[0].id);
    if (definition === words[0].definition) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
    dispatch(drawWord());
    setDefinition("");
    console.log(answer);
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

export default DrawWordScreen;
