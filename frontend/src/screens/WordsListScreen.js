import React from "react";
import { Row, Col } from "react-bootstrap";
import Word from "../components/Word";

const WordsListScreen = () => {
  return (
    <div>
      <h1>Words</h1>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Word />
        </Col>
      </Row>
    </div>
  );
};

export default WordsListScreen;
