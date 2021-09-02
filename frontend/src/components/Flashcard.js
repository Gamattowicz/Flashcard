import React from 'react'
import { Card } from 'react-bootstrap'

const Flashcard = ({ word, reversed, setReversed }) => {
  return (
    <Card
      className={`word ${reversed ? 'reversed bg-secondary text-dark' : ''}`}
      onClick={() => setReversed(!reversed)}
      style={{ height: '23rem' }}
    >
      <div className="front text-center w-100">
        <Card.Body>
          <Card.Title
            className="fw-bold fs-2 align-items-center d-flex justify-content-center"
            style={{ height: '3rem' }}
          >
            QUESTION
          </Card.Title>
          <Card.Text
            className="fs-6 align-items-center d-flex justify-content-center"
            style={{ height: '15rem', overflow: 'hidden' }}
          >
            {word.question}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small
            className="align-items-center d-flex justify-content-center w-100"
            style={{ height: '2rem' }}
          >
            <span class="float-start badge rounded-pill bg-primary me-5 text-dark">
              Category: {word.category}
            </span>

            <span class="badge rounded-pill bg-primary ms-5 text-dark">
              Deck: {word.deck}
            </span>
          </small>
        </Card.Footer>
      </div>

      <div className="back text-center w-100">
        <Card.Body>
          <Card.Title
            className="fw-bold fs-2 align-items-center d-flex justify-content-center"
            style={{ height: '3rem' }}
          >
            ANSWER
          </Card.Title>
          <Card.Text
            className="fs-6 align-items-center d-flex justify-content-center"
            style={{ height: '16rem', overflow: 'hidden' }}
          >
            {word.answer}
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  )
}

export default Flashcard
