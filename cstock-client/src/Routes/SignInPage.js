import React from "react";
import styles from "./SignIn.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInForm from "../Components/Sign-In_fm/SignInForm";

function SignInPage() {
  return (
    <main>
      <Container>
        <Row>
          <Col className={styles.formCol}>
            <div>
                
            <SignInForm/>
            </div>
            
          </Col>
          <Col className={styles.secondformCol}>
            <div>
              <div className={styles.signIn}>
                <h3>Create your account</h3>
                <div className="d-flex gap-3 ">
                    <img src="./Icons/ArrowRight.svg" alt="" />
                <Link to={"/signup"} className={styles.navLink}>Create account</Link>
                </div>
                
              </div>

              <img
                src="https://previews.123rf.com/images/jemastock/jemastock2001/jemastock200139430/138196134-man-reading-a-book-
            with-big-books-around-over-white-background-colorful-isometric-design-vector.jpg"
                alt=""
                className={styles.signUpImg}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SignInPage;
