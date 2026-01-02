// RoleBasedDashboard.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useInstructor from "../Hooks/useInstructor";


const RoleBasedDashboard = () => {
    const { user } = useContext(AuthContext); // user info যেখানে role আছে
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor] = useInstructor()

    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role অনুযায়ী redirect করা
    if (isAdmin) {
        return <Navigate to="/dashboard/adminHome" replace />;
    } else if (isInstructor) {
        return <Navigate to="/dashboard/instructorHome" replace />;
    } else {
        return <Navigate to="/dashboard/studentHome" replace />;
    }

    // Default fallback
    return <Navigate to="/login" replace />;
};

export default RoleBasedDashboard;