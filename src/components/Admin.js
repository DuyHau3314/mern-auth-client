import React, {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {getCookie, logout,updateUser} from '../auth/helpers';

import jwt from 'jsonwebtoken';
const Private = ({history}) => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    btnSubmit: "Submit",
  });

  const {role, name, email, password, btnSubmit } = values;

  const token = getCookie('token');

  useEffect(()=> {
    const {_id} = jwt.decode(token);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${_id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      const {name, email, role} = response.data;
      setValues({...values, role, name, email});
    }).catch(error=> {
      console.log('FETCH USER ERROR', error);
      if(error.response.status === 401){
        logout(()=> {
          history.push('/');
        });
      }
    });
  },[]);

  const handleOnChange = name => event => {
    setValues({...values, [name]: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API}/admin/update`,
        data: {
            name, password
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then(response => {
        console.log(`Update user successfully`, response);
        updateUser(response, ()=> {
          toast.success(response.data.message);

        });
        history.push('/private');
    }).catch(error => {
        console.log(`Update user failed`, error);
        toast.error(error.response.data.error);
    });
  };

  return (
    <>
      <h1>Private</h1>
      {/* {JSON.stringify(values)} */}
      {/* {isAuth() && <Redirect to='/' />} */}
      <Form>
      <Form.Group controlId="formBasicRole">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="role"
            placeholder="Enter role"
            name="role"
            value={role}
            onChange={handleOnChange("role")}
            disabled
          />
          <Form.Text className="text-muted">
            We'll never share your name with anyone else.
          </Form.Text>
        </Form.Group>

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
            disabled
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

export default Private;
