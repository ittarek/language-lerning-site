import  { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from './../Provider/AuthProvider';
import Spinner from '../Components/Spinner/Spinner';

const PrivetRoute = ({ children }) => {
    const { user, spinner } = useContext(AuthContext);

    const location = useLocation();

    // data loader no problem by spinner
    if (spinner) {
        return <Spinner />
    }
    // if user not login at first confirm this message then login user

    if (!user) {
        alert("You Have To Login First To Go Details");
    } else if (user) {
        return children;
    }
    return <Navigate state={{ from: location }} replace to="/login"></Navigate>;

};

export default PrivetRoute;
