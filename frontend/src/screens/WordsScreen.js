import React from "react";
import { Row, Col } from "react-bootstrap";

const WordsScreen = () => {
  return (
    <div>
      <h1>Words</h1>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <h3>Name:</h3>
        </Col>
      </Row>
    </div>
  );
};

export default WordsScreen;
