import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {authenticate, isAuth} from './helpers';
import {Link} from 'react-router-dom';
import Google from './Google';
import Facebook from './Facebook';
const Signup = ({history}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    btnSubmit: "Submit",
  });

  const { email, password, btnSubmit } = values;

  const handleOnChange = name => event => {
    setValues({...values, [name]: event.target.value});
  };

  const parentSignin = (response, next) => {
    authenticate(response, ()=> {
      isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
  });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/signin`,
        data: {
             email, password
        }
    }).then(response => {
        console.log(`Signin successfully`, response);
        authenticate(response, ()=> {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
            toast.success(`Sent activation account to ${email} successfully`);
        });
    }).catch(error => {
        console.log(`Signin failed`, error);
        toast.error(error.response.data.error);
    });
  };

  return (
    <>
      <h1>Signin</h1>
      {/* {JSON.stringify(values)} */}
      {isAuth() && <Redirect to='/' />}
      <Google parentSignin={parentSignin} />
      <Facebook parentSignin={parentSignin}/>
      <br />
      <Form mb="5">
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
      <br />
      <Button variant="primary" to="/forgot-password" as={Link}>Forgot Password</Button>
      <ToastContainer />
    </>
  );
};

export default Signup;
