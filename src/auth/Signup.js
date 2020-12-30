import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    btnSubmit: "Submit",
  });

  const { name, email, password, btnSubmit } = values;

  const handleOnChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: {
        name,
        email,
        password,
      },
    })
      .then((response) => {
        console.log(
          `Sent activation account to ${email} successfully`,
          response
        );
        toast.success(`Sent activation account to ${email} successfully`);
      })
      .catch((error) => {
        console.log(`Sent activation account to ${email} failed`, error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <>
      <h1>Signup</h1>
      {/* {JSON.stringify(values)} */}
      {isAuth() && <Redirect to="/" />}
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={handleOnChange("name")}
          />
          <Form.Text className="text-muted">
            We'll never share your name with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleOnChange("email")}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleOnChange("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {btnSubmit}
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Signup;
