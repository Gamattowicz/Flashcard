import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <Nav className="justify-content-end py-2">
              Copyright &copy; Gamattowicz
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
