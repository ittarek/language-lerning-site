// RoleBasedDashboard.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";


const RoleBasedDashboard = () => {
    const { user } = useContext(AuthContext); // user info যেখানে role আছে
    const [isAdmin, isAdminLoading] = useAdmin();
console.log(user.role);

    console.log(isAdmin);
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role অনুযায়ী redirect করা
    if (isAdmin) {
        return <Navigate to="/dashboard/adminHome" replace />;
    } else if (user.role === "instructor") {
        return <Navigate to="/dashboard/instructorHome" replace />;
    } else if (user.role === "student") {
        return <Navigate to="/dashboard/studentHome" replace />;
    }

    // Default fallback
    return <Navigate to="/login" replace />;
};

export default RoleBasedDashboard;