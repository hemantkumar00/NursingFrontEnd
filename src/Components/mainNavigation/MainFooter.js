import React from "react";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <footer className="  py-4 mt-4" style={{ backgroundColor: "#E1DDE9" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About EduLearn</h3>
            <p>
              EduLearn is your go-to platform for high-quality courses, expert
              instructors, and certifications. Start your learning journey with
              us today!
            </p>
          </div>
          <div className="col-md-3">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li>
                <Link
                  className="link-offset-2 link-underline link-underline-opacity-0"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="link-offset-2 link-underline link-underline-opacity-0"
                  to="/testseries"
                >
                  TestSeries
                </Link>
              </li>
              <li>
                <Link
                  className="link-offset-2 link-underline link-underline-opacity-0"
                  to="#"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Contact Us</h3>
            <p>
              Email: info@edulearn.com
              <br />
              Phone: +1234567890
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 EduLearn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MainFooter;
