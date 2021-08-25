import React, { useState } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const Flashcard = ({ word }) => {
  const [reversed, setReversed] = useState(false)

  return (
    <Card
      className={`word ${reversed ? 'reversed' : ''}`}
      onClick={() => setReversed(!reversed)}
    >
      <div className="front">{word.question}</div>
      <div className="back">{word.answer}</div>
    </Card>
  )
}

export default Flashcard
