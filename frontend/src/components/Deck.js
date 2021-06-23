import React from "react";

const Deck = ({ deck }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
    </Card>
  );
};

export default Deck;
