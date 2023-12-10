import React from "react";
import styles from "./Sign.module.css";
import { Col, Container, Row } from "react-bootstrap";
import SignUpForm from "../Components/Sign-up_Form/SignUpForm";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <main>
      <Container>
        <Row>
          <Col className={styles.formCol}>
            <SignUpForm/>
            
          </Col>
          <Col className={styles.secondformCol}>
            <div>
            <div className={styles.loginDiv}>
              <h4>Already have an account? </h4>
              <div className="d-flex gap-3">
                <img src="./Icons/ArrowRight.svg" alt="" />
              <Link to={'/login'} className={styles.loginBtn}>Login</Link>
              </div>
              
            </div>

            <img src="https://previews.123rf.com/images/jemastock/jemastock2001/jemastock200139430/138196134-man-reading-a-book-
            with-big-books-around-over-white-background-colorful-isometric-design-vector.jpg" alt="" className={styles.signUpImg
            } />
            </div>
          
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SignUpPage;
