import React from "react";
import styles from "./header.module.css";
import c from "clsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Header() {
  const { carts } = useSelector((state) => state.carts); 
  const login = useSelector((state) => state.auth.login)
  const user = useSelector((state) => state.auth.userdata)

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="#555555"
        className={c(styles.navbar, "fixed-top")}
      >
        <Container>
          <Navbar.Brand href="/" className={styles.navBrand}>
            {" "}
            <img src="../Icons/Logo.svg" alt="logo" /> stocks
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
            <Nav.Link>
                <Link className={styles.navLink} to={'/'}>Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link className={styles.navLink} to={'/books'}>Books</Link>
              </Nav.Link>

              {
                login ?
                <Nav.Link eventKey={2}>
                <Link className={styles.navLink} to={"/userprofile"}> <img src="../Icons/User.svg" alt="" /> {user.name} </Link>
              </Nav.Link>
                 :
                 <Nav.Link eventKey={2}>
                <Link className={styles.navLink} to={"/login"}>Login</Link>
              </Nav.Link>
              }
              <Link
                to={"/cart"}
                className="text-decoration-none d-flex flex-row"
              >
                <img src="../Icons/Cart.svg" alt="cart-icon" />
                <span className="fs-6 text-danger fw-bold pb-3 ">
                  {carts.length}
                </span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
