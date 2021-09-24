import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'

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
              {userInfo ? (
                <>
                  <LinkContainer to="/exercises/create">
                    <Nav.Link>
                      <i class="fas fa-book"></i>EXERCISE
                    </Nav.Link>
                  </LinkContainer>

                  <NavDropdown title="WORD" id="word">
                    <LinkContainer to="/words">
                      <NavDropdown.Item>Word list</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/words/create">
                      <NavDropdown.Item>Create word</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <NavDropdown title="DECK" id="deck">
                    <LinkContainer to="/decks">
                      <NavDropdown.Item>Deck list</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/decks/create">
                      <NavDropdown.Item>Create deck</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <NavDropdown title="CATEGORY" id="category">
                    <LinkContainer to="/category">
                      <NavDropdown.Item>Category list</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/category/create">
                      <NavDropdown.Item>Create category</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <NavDropdown title={userInfo.username} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i class="fas fa-user-plus"></i> REGISTRATION
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> LOGIN
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.is_admin && (
                <NavDropdown title="ADMIN" id="adminMenu">
                  <LinkContainer to="/admin/usersList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/words">
                    <NavDropdown.Item>Words</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/admin/exercises">
                    <NavDropdown.Item>Exercises</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
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
