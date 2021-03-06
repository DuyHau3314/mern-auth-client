import {isAuth} from '../auth/helpers';
import {Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({component: Component, ...rest}) => {
    return ( 
        <Route {...rest} render={
            props => isAuth() ? <Component {...props} /> : <Redirect to="/signin" />
        } />
     );
}
 
export default PrivateRoute;