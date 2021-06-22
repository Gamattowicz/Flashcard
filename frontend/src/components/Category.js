import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/category/${category.id}`}>{category.name}</Link>
    </Card>
  );
};

export const listWordDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORD_DETAILS_REQUEST });
    const { data } = await axios.get(`/words/${id}`);
    dispatch({
      type: WORD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export default Category;
