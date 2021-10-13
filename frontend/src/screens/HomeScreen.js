import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Flashcard from '../Flashcard_Exercise.jpg'

const HomeScreen = () => {
  return (
    <Row>
      <Col xs={10} md={6} className="my-5">
        <Col
          className="text-primary d-flex justify-content-start fw-bold fs-2 text-uppercase align-items-center"
          style={{ height: '20vh' }}
          xs={12}
        >
          <p>Make learning easier...</p>
        </Col>
        <Col
          className="text-primary d-flex aligns-items-center justify-content-center fw-bold fs-2 text-uppercase align-items-center"
          style={{ height: '20vh' }}
          xs={12}
        >
          <Link to={'/words/create'} className="home">
            ...Create Flashcard...
          </Link>
        </Col>
        <Col
          className="text-primary d-flex aligns-items-center justify-content-end fw-bold fs-2 text-uppercase align-items-center"
          style={{ height: '20vh' }}
          xs={12}
        >
          <Link to={'/exercises/create'} className="home">
            ...Start the exercise.
          </Link>
        </Col>
      </Col>
      <Col
        xs={12}
        md={6}
        className="d-flex aligns-items-center justify-content-end align-items-center"
      >
        <Image
          src={Flashcard}
          className="border border-1 border-dark rounded-3"
          alt="Flashcard"
          fluid
        />
      </Col>
    </Row>
  )
}

export default HomeScreen
