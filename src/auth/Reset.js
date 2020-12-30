import React, {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Reset = ({history, match}) => {
  const [values, setValues] = useState({
    newPassword: "",
    token: "",
    btnSubmit: "Submit",
  });

  const { newPassword, token, btnSubmit } = values;

  useEffect(()=> {
    setValues({...values, token: match.params.token});
  },[]);

  const handleOnChange = name => event => {
    setValues({...values, [name]: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/reset-password`,
        data: {
             newPassword, token
        }
    }).then(response => {
        console.log(`Forgot sent successfully`, response);
        toast.success(response.data.message);
        history.push('/signin');
    }).catch(error => {
        console.log(`Signin failed`, error);
        toast.error(error.response.data.error);
    });
  };

  return (
    <>
      <h1>Reset Password</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={newPassword}
            onChange={handleOnChange("newPassword")}
          />
          <Form.Text className="text-muted">
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

export default Reset;
