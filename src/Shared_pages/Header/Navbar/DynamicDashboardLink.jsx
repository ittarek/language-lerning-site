import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const DynamicDashboardLink = () => {
    const { user } = useContext(AuthContext);

    // User role অনুযায়ী path determine করা
    const getDashboardPath = () => {
        if (!user) return "/login";

        switch (user.role) {
            case "admin":
                return "/dashboard/adminHome";
            case "instructor":
                return "/dashboard/instructorHome";
            case "student":
                return "/dashboard/studentHome";
            default:
                return "/dashboard";
        }
    };

    return (
        <Link
            to={getDashboardPath()}
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
            Dashboard
        </Link>
    );
};

export default DynamicDashboardLink;