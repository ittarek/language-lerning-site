import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../Hooks/useAdmin";

import { useQuery } from "@tanstack/react-query";
import useInstructors from "../Hooks/useInstructor";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaAd, FaAdn, FaBookOpen, FaHandMiddleFinger, FaHistory, FaHome, FaHouzz, FaPeace, FaUser } from "react-icons/fa";

const DashBoard = () => {
  const [isInstructor] = useInstructors();
  const [isAdmin] = useAdmin();

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
          {/* Page content here */} <h1>DashBoard</h1> <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="navbar menu p-4 w-80 h-full bg-black text-base-content ">
            {/* Sidebar content here */}
         
            {isAdmin ? (
              <>
                {/* admin */}
                <li>
                  <NavLink
                    to="adminHome"
                    className="font-bold text-2xl text-white "
                  >
                   <FaAdn
                    className="text-purple-400"></FaAdn> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manageClasses" className="font-bold text-1xl ">
                 <FaHouzz className="text-purple-400"/>   Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="manageUsers" className="font-bold text-1xl ">
                  <FaUser className="text-purple-400"></FaUser>  Manage Users
                  </NavLink>
                </li>
              </>
            ) : isInstructor ? (
              <>
                <li>
                  <NavLink
                    to="instructorHome"
                    className="font-bold text-2xl text-purple-600 "
                  >
                 <FaHome className="text-purple-400"/>   Instructors Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="addClass" className="font-bold text-1xl ">
                   <FaAd className="text-purple-400"/> Add A Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="myAddedClasses" className="font-bold text-1xl ">
                  <FaBookOpen className="text-purple-400"/>  My Classes
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink
                    to="studentHome"
                    className="font-bold text-2xl text-purple-600 "
                  >
                    <FaHome className="text-purple-400"/> Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="mySelectedClasses" className="font-bold text-1xl text-white ">
                   <FaBookOpen className="text-purple-400"/> My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="myEnroll" className="font-bold text-1xl text-white ">
                  <FaPeace className="text-purple-400"/>  My Enroll Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="paymentHistory" className="font-bold text-1xl text-white ">
                   <FaHistory className="text-purple-400"/> Payment History
                  </NavLink>
                </li>
              </>
            )}

            <div className=" divider text-red-400 mt-24"></div>
            <li>
              <NavLink to="/" className="font-bold text-2xl text-white  ">
               <FaHome className="text-purple-400"></FaHome>  Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" className="font-bold text-2xl text-white  ">
               <FaBookOpen className="text-purple-400"></FaBookOpen>  Classes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
