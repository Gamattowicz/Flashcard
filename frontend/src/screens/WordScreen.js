import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

const WordScreen = () => {
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
                <Col>Word</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Definition</strong>
                </Col>
                <Col>Słowo</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Category</strong>
                </Col>
                <Col>Home</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </div>
  );
};

export default WordScreen;
