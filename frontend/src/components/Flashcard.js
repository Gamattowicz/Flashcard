import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

const Flashcard = ({ word }) => {
  const [reversed, setReversed] = useState(false)

  return (
    <Card
      className={`word ${reversed ? 'reversed bg-secondary text-dark' : ''}`}
      onClick={() => setReversed(!reversed)}
      style={{ height: '19rem' }}
    >
      <div className="front text-center">
        <Card.Body>
          <Card.Title
            className="d-flex align-content-start flex-wrap"
            style={{ height: '7rem' }}
          >
            QUESTION
          </Card.Title>
          <Card.Text style={{ height: '7rem' }}>{word.question}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted" style={{ height: '1rem' }}>
            Last updated 3 mins ago
          </small>
        </Card.Footer>
      </div>

      <div className="back text-center">
        <Card.Body>
          <Card.Title className="fw-bold">ANSWER</Card.Title>
          <Card.Text>{word.answer}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  )
}

export default Flashcard
