import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Word = ({ word }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/words/${word.id}`}>{word.name}</Link>
    </Card>
  );
};

export default Word;
