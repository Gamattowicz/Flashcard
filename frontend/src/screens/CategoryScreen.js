import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { listCategoryDetails } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryScreen = ({ match }) => {
  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { error, loading, category } = categoryDetails;

  useEffect(() => {
    dispatch(listCategoryDetails(match.params.id));
  }, [dispatch]);

  return (
    <div>
      <Link to="/admin/category" className="btn btn-outline-primary my-3">
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
                  <Col>{category.name}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Color</strong>
                  </Col>
                  <Col>{category.color}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default CategoryScreen;
