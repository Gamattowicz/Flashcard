import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { listWordDetails } from "../actions/wordActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CreateWordScreen = () => {
  return (
    <div>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Name</strong>
                </Col>
                <Col>name</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Definition</strong>
                </Col>
                <Col>name</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Category</strong>
                </Col>
                <Col>name</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </div>
  );
};

export default CreateWordScreen;
