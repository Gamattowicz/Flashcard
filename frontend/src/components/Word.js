import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Word = () => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/word/1`}>Word</Link>
    </Card>
  );
};

export default Word;
