import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Exercise from "../components/Exercise";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listExercises } from "../actions/exerciseActions";

const ExercisesListScreen = () => {
  const dispatch = useDispatch();
  const exerciseList = useSelector((state) => state.exerciseList);
  const { error, loading, exercises } = exerciseList;

  useEffect(() => {
    dispatch(listExercises());
  }, [dispatch]);

  return (
    <div>
      <h1>Exercises</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {exercises.map((exercise) => (
            <Col key={exercise.id} sm={12} md={6} lg={4} xl={3}>
              <Exercise exercise={exercise} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ExercisesListScreen;
