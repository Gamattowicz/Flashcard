import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { listWordDetails } from "../actions/wordActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const WordScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const wordDetails = useSelector((state) => state.wordDetails);
  const { error, loading, word } = wordDetails;

  useEffect(() => {
    dispatch(listWordDetails(match.params.id));
  }, [dispatch]);

  return (
    <div>
      <Link onClick={history.goBack} className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
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
                  <Col>{word.name}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Definition</strong>
                  </Col>
                  <Col>{word.definition}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Category</strong>
                  </Col>
                  <Col>{word.category}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Deck</strong>
                  </Col>
                  <Col>{word.deck}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Exercises</strong>
                  </Col>
                  <Col>{word.studied}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Correct answers</strong>
                  </Col>
                  <Col>{word.correct_answers}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Wrong answers</strong>
                  </Col>
                  <Col>{word.wrong_answers}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default WordScreen;
