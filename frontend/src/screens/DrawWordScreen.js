import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { drawWord } from "../actions/wordActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const DrawWordScreen = () => {
  const dispatch = useDispatch();
  const wordDraw = useSelector((state) => state.wordDraw);
  const { error, loading, words } = wordDraw;

  useEffect(() => {
    dispatch(drawWord());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(drawWord());
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
                    <strong>Definition</strong>
                  </Col>
                  {words[0] &&
                    words.map((word) => (
                      <Col key={word.id}>{word.definition}</Col>
                    ))}
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

          <Button type="submit" variant="primary mt-3" onClick={submitHandler}>
            DRAW
          </Button>
        </Col>
      )}
    </div>
  );
};

export default DrawWordScreen;
