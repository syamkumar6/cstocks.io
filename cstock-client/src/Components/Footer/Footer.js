import React from "react"
import { Container} from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-light text-secondary mb-3">
      <Container className="border-top pt-4">
        <div className="d-flex flex-row justify-content-around border-bottom pb-2">

          <div>
              <h3>Library</h3>
              <div className="d-flex flex-column gap-2">
                <Link to={'#'} className="text-decoration-none text-secondary">Genres</Link>
                <Link to={'#'} className="text-decoration-none text-secondary">Languages</Link>
                <Link to={'#'} className="text-decoration-none text-secondary">Authors</Link>
              </div>
          </div>

          <div className="">
              <h3>Community</h3>
              <dvi className="d-flex flex-column gap-2">
                <Link to={'#'} className="text-decoration-none text-secondary">Articles</Link>
                <Link to={'#'} className="text-decoration-none text-secondary">Author Interviews</Link>
                <Link to={'#'} className="text-decoration-none text-secondary">Newsletter</Link>
              </dvi>
          </div>

          <div className="">
              <h3>Company</h3>
              <div className="d-flex flex-column gap-2">
                <Link to={'#'} className="text-decoration-none text-secondary">Author Services</Link>
                <Link to={'#'} className="text-decoration-none text-secondary">About / Contact</Link>
                <Link to={'#'} className="text-decoration-none text-secondary">Accessibility Statement</Link>
              </div>
          </div>

        </div>
        <div className="d-flex flex-row justify-content-between p-3 border-bottom">
          <span>&copy;2023 Cstocks. All Rights Reserved. </span>
          <span>Terms-privacy</span>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
