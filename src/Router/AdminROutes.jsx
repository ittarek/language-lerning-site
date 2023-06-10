import { Navigate, useLocation } from "react-router-dom";

import { HashLoader } from "react-spinners";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AdminROutes = ({ children }) => {
  const { user, spinner } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (spinner || isAdminLoading) {
    return (
      <div className="flex justify-center items-center pt-40 w-full">
        {" "}
        <HashLoader
          // spinner={spinner}
          size={50}
          color="green"
          aria-label="Loading Spinner"
          data-testid="MoonLoader"
          margin="auto"
        />
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminROutes;
