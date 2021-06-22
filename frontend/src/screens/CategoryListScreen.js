import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Category from "../components/Category";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listCategories } from "../actions/categoryActions";

const CategoryListScreen = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { error, loading, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div>
      <h1>Categories</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {categories.map((category) => (
            <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
              <Category category={category} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CategoryListScreen;
