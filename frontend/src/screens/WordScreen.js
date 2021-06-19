import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import axios from "axios";

const WordScreen = ({ match }) => {
  const [word, setWord] = useState([]);

  useEffect(() => {
    async function fetchWord() {
      const { data } = await axios.get(`/words/${match.params.id}`);
      setWord(data);
    }

    fetchWord();
  }, []);

  return (
    <div>
      <Link to="/words" className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
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
          </ListGroup>
        </Card>
      </Col>
    </div>
  );
};

export default WordScreen;
