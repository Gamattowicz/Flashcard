import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Word from "../components/Word";
import axios from "axios";

const WordsListScreen = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function fetchWords() {
      const { data } = await axios.get("http://127.0.0.1:8000/words/");
      setWords(data);
    }
    fetchWords();
  }, []);
  return (
    <div>
      <h1>Words</h1>
      <Row>
        {words.map((word) => (
          <Col key={word.id} sm={12} md={6} lg={4} xl={3}>
            <Word word={word} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WordsListScreen;
