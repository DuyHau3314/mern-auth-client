import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { isAuth, logout } from "../auth/helpers";

const Layout = ({ children, match, history }) => {
  console.log(history);
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand to="/" as={Link}>
          Navbar
        </Navbar.Brand>
        <Nav className="mr-auto">
          {!isAuth() && (
            <>
              <Nav.Link to="/signup" as={Link} active={isActive("/signup")}>
                Signup
              </Nav.Link>
              <Nav.Link to="/signin" as={Link} active={isActive("/signin")}>
                Signin
              </Nav.Link>
            </>
          )}
          {isAuth() && (
            <>
              <Nav.Link
                to={
                  isAuth() && isAuth().role === "admin" ? "/admin" : "/private"
                }
                active={
                  isAuth() && isAuth().role === "admin"
                    ? isActive("/admin")
                    : isActive("/private")
                }
                as={Link}
              >
                {isAuth().name}
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  logout(() => {
                    history.push("/");
                  })
                }
              >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>

      <Container>{children}</Container>
    </>
  );
};

export default withRouter(Layout);
