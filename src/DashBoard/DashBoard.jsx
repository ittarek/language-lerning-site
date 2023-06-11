import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../Hooks/useAdmin";
import useInstructors from "./../Hooks/useInstructor";

const DashBoard = () => {
  // const [isInstructor] = useInstructors();
  const [isAdmin] = useAdmin();
  // const isAdmin = true
  return (
    <div>
      {" "}
      <Helmet>
        <title>Summer | DashBoard</title>
      </Helmet>
      <div className="drawer lg:drawer-open">
        {" "}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */} <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="navbar menu p-4 w-80 h-full bg-purple-400 text-base-content ">
            {/* Sidebar content here */}
            {/* { usreRole === 'admin' ?
<>
Your Admin routes
<> :
userRole === "instructor"?
<>
Your Instrictor routes
<>:
<> Students Routes<>
} */}
            {isAdmin ? (
              <>
                {/* Admin */}
                <li>
                  <NavLink
                    to="manageClasses"
                    className="font-bold text-2xl text-purple-600 "
                  >
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manageClasses" className="font-bold text-1xl ">
                    Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manageUsers" className="font-bold text-1xl ">
                    Manage Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink to="myClasses" className="font-bold text-1xl ">
                    My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="myEnroll" className="font-bold text-1xl ">
                    My Enroll Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="paymentHistory" className="font-bold text-1xl ">
                    Payment History
                  </NavLink>
                </li>
              </>
            )}

            {/* instruction */}
            <li>
              <NavLink
                to="instructorHome"
                className="font-bold text-2xl text-purple-600 "
              >
                Instructors Home
              </NavLink>
            </li>
            <li>
              <NavLink to="addClass" className="font-bold text-1xl ">
                Add A Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="myAddedClasses" className="font-bold text-1xl ">
                My Classes
              </NavLink>
            </li>

            {/* <li>
              <NavLink to="feedBack" className="font-bold text-1xl ">
                FeedBack
              </NavLink>
            </li> */}

            <div className=" divider text-red-400 mt-24"></div>
            <li>
              <NavLink to="/" className="font-bold text-2xl  ">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
