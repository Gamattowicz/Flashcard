import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { listDeckDetails } from "../actions/deckActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const DeckScreen = ({ match }) => {
  const dispatch = useDispatch();
  const deckDetails = useSelector((state) => state.deckDetails);
  const { error, loading, deck } = deckDetails;

  useEffect(() => {
    dispatch(listDeckDetails(match.params.id));
  }, [dispatch]);

  return (
    <div>
      <Link to="/decks" className="btn btn-outline-primary my-3">
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
                  <Col>{deck.name}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Words</strong>
                  </Col>
                  <Col>
                    {deck.words
                      ? deck.words.map((word, index) => {
                          const wordLink = deck.words_id[index];
                          return (
                            <Row>
                              <Link to={`/words/${wordLink}`}>{word}</Link>
                            </Row>
                          );
                        })
                      : ""}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default DeckScreen;
