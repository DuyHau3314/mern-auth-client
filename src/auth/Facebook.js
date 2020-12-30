import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "react-bootstrap";
import axios from "axios";

const Facebook = ({parentSignin}) => {
    const responseFacebook = (response) => {
        console.log(response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: {
                userID: response.userID,
                accessToken: response.accessToken
            }
        }).then(response => {
            parentSignin(response);
        }).catch(error => {
            console.log(error);
        })
      }
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      callback={responseFacebook}
      render={(renderProps) => (
        <Button variant="primary" className="btn btn-block btn-lg" onClick={renderProps.onClick}>
          Login with Facebook
        </Button>
      )}
    />
  );
};

export default Facebook;
