import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Word from "../components/Word";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listWords } from "../actions/wordActions";

const WordsListScreen = () => {
  const dispatch = useDispatch();
  const wordList = useSelector((state) => state.wordList);
  const { error, loading, words } = wordList;

  useEffect(() => {
    dispatch(listWords());
  }, [dispatch]);

  return (
    <div>
      <h1>Words</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {words.map((word) => (
            <Col key={word.id} sm={12} md={6} lg={4} xl={3}>
              <Word word={word} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default WordsListScreen;
