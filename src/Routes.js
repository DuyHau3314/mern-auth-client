import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Signup from './auth/Signup';
import ActiveAccount from './auth/ActivationAccount';
import Signin from './auth/Signin';
import Private from './components/Private';
import Admin from './components/Admin';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';
const Routes = () => {
    return ( 
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/auth/activate/:token" component={ActiveAccount} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/auth/reset-password/:token" component={Reset} />
            <Route path="/forgot-password" component={Forgot} />
            <PrivateRoute path="/private" exact component={Private} />
            <AdminRoute path="/admin" exact component={Admin} />

        </Switch>
    );
}
 
export default Routes;