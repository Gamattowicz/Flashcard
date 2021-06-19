import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Word from "../components/Word";
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
        <h2>Loading</h2>
      ) : error ? (
        <h3>{error}</h3>
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
