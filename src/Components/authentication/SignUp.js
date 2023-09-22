import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../API";

const SignUp = () => {
  let navigate = useNavigate();
  let nameRef = useRef();
  let phoneNoRef = useRef();
  let collegeRef = useRef();
  let targetRef = useRef();
  let usernameRef = useRef();
  let passwordRef = useRef();

  let [error, setError] = useState({
    name: "",
    phoneNo: "",
    college: "",
    target: "",
    username: "",
    password: "",
  });

  const updateErrors = (errorObj) => {
    if (errorObj) {
      for (let i = 0; i < errorObj.length; i++) {
        if (errorObj[i].path === "password" && error.password === "") {
          setError((prevError) => ({
            ...prevError,
            password: errorObj[i].msg,
          }));
          break;
        }
      }

      for (let i = 0; i < errorObj.length; i++) {
        if (errorObj[i].path === "username" && error.username === "") {
          setError((prevError) => ({
            ...prevError,
            username: errorObj[i].msg,
          }));
          break;
        }
      }
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  let addUserHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const phoneNo = phoneNoRef.current.value;
    const college = collegeRef.current.value;
    const target = targetRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (name === "") {
      setError((prevError) => ({
        ...prevError,
        name: "Name is required field.",
      }));
    } else
      setError((prevError) => ({
        ...prevError,
        name: "",
      }));

    if (phoneNo === "" || !isValidPhoneNumber(phoneNo)) {
      setError((prevError) => ({
        ...prevError,
        phoneNo: "Enter a valid phone number",
      }));
    } else
      setError((prevError) => ({
        ...prevError,
        phoneNo: "",
      }));

    if (college === "") {
      setError((prevError) => ({
        ...prevError,
        college: "College is required field.",
      }));
    } else
      setError((prevError) => ({
        ...prevError,
        college: "",
      }));

    if (target === "") {
      setError((prevError) => ({
        ...prevError,
        target: "target is required field.",
      }));
    } else
      setError((prevError) => ({
        ...prevError,
        target: "",
      }));

    await axios
      .post(`${API}/signup`, {
        name,
        phoneNo,
        college,
        target,
        username,
        password,
      })
      .then(() => {
        setError({
          name: "",
          phoneNo: "",
          college: "",
          target: "",
          username: "",
          password: "",
        });
        notify();
        navigate("/signin");
      })
      .catch((e) => {
        console.log(e);
        const errorObj = JSON.parse(e.request.response).errors;
        if (JSON.parse(e.request.response).error) {
          setError((prevError) => ({
            ...prevError,
            username: "A user with the given username is already registered",
          }));
        } else updateErrors(errorObj);
      });
  };

  const notify = () => {
    toast.success(`Msg: Account created redirecting to login`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="p-5">
      <form onSubmit={addUserHandler}>
        <div id="emailHelp" className="form-text text-danger">
          {error.name}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            ref={nameRef}
            placeholder="Joh Do"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div id="emailHelp" className="form-text text-danger">
          {error.phoneNo}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            ref={phoneNoRef}
            id="phoneNo"
            placeholder="+91 9999999999"
          />
          <label htmlFor="phoneNo">Phone No.</label>
        </div>
        <div id="emailHelp" className="form-text text-danger">
          {error.college}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="college"
            ref={collegeRef}
            placeholder="some college"
          />
          <label htmlFor="college">College Name</label>
        </div>
        <div id="emailHelp" className="form-text text-danger">
          {error.target}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="target"
            ref={targetRef}
            placeholder="name@example.com"
          />
          <label htmlFor="target">Target Exam</label>
        </div>
        <div id="emailHelp" className="form-text text-danger">
          {error.username}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="username"
            ref={usernameRef}
            placeholder="name@example.com"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div id="emailHelp" className="form-text text-danger">
          {error.password}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
