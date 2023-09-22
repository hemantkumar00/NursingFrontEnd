import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../API";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";

function MainHomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let nameRef = useRef();
  let emailRef = useRef();
  let messageRef = useRef();

  async function handleFeedBackSubmit(e) {
    e.preventDefault();
    const user = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    try {
      await axios.post(`${API}/add/feedback`, {
        user,
        email,
        message,
      });
      toast.success(`Thanks for adding feedback`, {
        position: toast.POSITION.TOP_CENTER,
      });
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } catch (e) {
      console.error(e);
      toast.error(`Msg: some error in posting feedback`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function fetchAllTestSeries() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/all/testseries`);
      const responseData = JSON.parse(response.request.response).testSeries;
      setData(responseData);
    } catch (e) {
      const error = JSON.parse(e.request.response).error;
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllTestSeries();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* Hero Section */}
          <section className="hero">
            <div className="container hero-content">
              <h1>Unlock Your Potential with Nursing Proj.</h1>
              <p>
                Discover our comprehensive and interactive courses designed to
                empower you with essential skills for success.
              </p>
              <Link to="/testseries" className="cta-button">
                Explore TestSeries
              </Link>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about">
            <div className="container about-content">
              <h2>About Us</h2>
              <p>
                At Nursing Proj., we believe in providing high-quality education
                accessible to everyone, anywhere. Our platform offers a wide
                range of courses taught by industry experts to help you achieve
                your academic and career goals.
              </p>
            </div>
          </section>

          {/* Courses Section */}
          <section id="courses" className="courses">
            <div className="container">
              <h2>Featured Courses</h2>
              <div className="row">
                {data
                  .filter((course) => course.activation)
                  .slice(0, 3) // Limit to 3 courses
                  .map((course, index) => (
                    <div className="col-md-6 col-lg-4" key={index}>
                      <div className="course-card">
                        <img
                          src={course.image}
                          alt={`Course Image ${index + 1}`}
                        />
                        <h3>{course.topic}</h3>
                        <p>
                          {course.description.length > 100
                            ? course.description.slice(0, 100) + "..."
                            : course.description}
                        </p>
                        <Link
                          to={`/testseries/single/${course._id}`}
                          className="cta-button"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact">
            <div className="container contact-content">
              <h2>Contact Us</h2>
              <p>
                If you have any questions or inquiries, feel free to get in
                touch with us using the form below or send us an E-mail on{" "}
                <a href="mailto:hemantkumar23090@gmail.com">Nursing Proj.</a>
              </p>
              <form onSubmit={handleFeedBackSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  id="name"
                  name="name"
                  ref={nameRef}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  id="email"
                  name="email"
                  ref={emailRef}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  id="message"
                  name="message"
                  ref={messageRef}
                  required
                ></textarea>
                <button className="cta-button">Submit</button>
              </form>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
}

export default MainHomePage;
