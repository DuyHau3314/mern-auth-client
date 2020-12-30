import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const ActiveAccount = ({history, match}) => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    useEffect(()=>{
        setToken(match.params.token);
        const {name} = jwt.decode(match.params.token);
        setName(name);
    },[match.params.token]);
    const handleSubmit = (event ) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/activation-account`,
            data: {
                token
            }
        }).then(response => {
            console.log('SAVE USER SUCCESSFULLY', response);
            history.push('/signin');
            toast.success(response.data.message);
            
        }).catch(error => {
            console.log('SAVE USER ERROR', error);
            toast.error(error?.response?.data?.error);
        });
    };

    return ( 
        <>
        <h1>Active Account</h1>
        <h5>Hey <strong>{name}</strong>, Click button to active account</h5>
        <Button variant="primary" className="btn-lg" style={{ marginTop: '20px' }} onClick={handleSubmit} >Active Link</Button>
        <ToastContainer />
        </>
     );
}
 
export default ActiveAccount;