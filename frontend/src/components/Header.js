import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FLASHCARD</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/exercises/create">
                <Nav.Link>
                  <i class="fas fa-book"></i>EXERCISE
                </Nav.Link>
              </LinkContainer>

              <NavDropdown title="VOCABULARY" id="vocabulary">
                <LinkContainer to="/words">
                  <NavDropdown.Item>List of words</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/words/create">
                  <NavDropdown.Item>Create word</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/category">
                  <NavDropdown.Item>List of categories</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/create">
                  <NavDropdown.Item>Create category</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/decks">
                  <NavDropdown.Item>List of decks</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/decks/create">
                  <NavDropdown.Item>Create deck</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="ADMIN" id="adminMenu">
                  <LinkContainer to="/admin/usersList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/words">
                    <NavDropdown.Item>Words</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/exercises">
                    <NavDropdown.Item>Exercises</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/decks">
                    <NavDropdown.Item>Decks</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
