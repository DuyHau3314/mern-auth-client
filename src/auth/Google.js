import React from "react";
import GoogleLogin from "react-google-login";
import {Button} from 'react-bootstrap';
import axios from 'axios';
const Google = ({parentSignin}) => {
    const responseGoogle = (response) => {
        console.log(response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data:{
                idToken: response.tokenId
            }
        }).then(response => {
            console.log('GOOLE SIGNIN SUCCESSFULLY', response);
            parentSignin(response);
        }).catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error);
        });
    }
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button variant="danger" className="btn btn-block btn-lg" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          Login with Google
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Google;
