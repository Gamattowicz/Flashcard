import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { listExerciseDetails } from "../actions/exerciseActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ExerciseDetailsScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const exerciseDetails = useSelector((state) => state.exerciseDetails);
  const { error, loading, exercise } = exerciseDetails;

  useEffect(() => {
    dispatch(listExerciseDetails(match.params.id));
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
                    <strong>Words number</strong>
                  </Col>
                  <Col>{exercise.words_num}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Correct answers number</strong>
                  </Col>
                  <Col>{exercise.correct_answers}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Wrong answers number</strong>
                  </Col>
                  <Col>{exercise.wrong_answers}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Deck</strong>
                  </Col>
                  <Col>{exercise.deck}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default ExerciseDetailsScreen;
