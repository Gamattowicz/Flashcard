import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <Container>
        <Row>
          <Col>
            <Nav className="justify-content-end py-2">
              <div className="social col-md-12 d-flex justify-content-center pb-1">
                <span>
                  <a href="mailto: p.romanczuk31@gmail.com">
                    <i class="fas fa-envelope mx-3"></i>
                  </a>
                </span>
                <span>
                  <a href="https://github.com/Gamattowicz">
                    <i className="fab fa-github-square mx-3"></i>
                  </a>
                </span>
                <span>
                  <a href="https://linkedin.com/in/przemysław-romańczuk">
                    <i className="fab fa-linkedin mx-3"></i>
                  </a>
                </span>
              </div>
              <div className="copyright col-md-12 d-flex justify-content-center pt-1">
                <span>© 2021 Copyright | Designed by Przemysław Romańczuk</span>
              </div>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
