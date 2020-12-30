import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {isAuth} from './helpers';

const Forgot = ({history}) => {
  const [values, setValues] = useState({
    email: "",
    btnSubmit: "Submit",
  });

  const { email, btnSubmit } = values;

  const handleOnChange = name => event => {
    setValues({...values, [name]: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/forgot-password`,
        data: {
             email
        }
    }).then(response => {
        console.log(`Forgot sen successfully`, response);
        toast.success(`Sent activation account to ${email} successfully`);
    }).catch(error => {
        console.log(`Signin failed`, error);
        toast.error(error.response.data.error);
    });
  };

  return (
    <>
      <h1>Forgot Password</h1>
      {/* {JSON.stringify(values)} */}
      {isAuth() && <Redirect to='/' />}
      <Form>
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {btnSubmit}
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Forgot;
