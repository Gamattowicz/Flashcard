import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Deck = ({ deck }) => {
  return (
    <Card className="my-3 p-3 rounded text-center">
      <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
    </Card>
  )
}

export default Deck
