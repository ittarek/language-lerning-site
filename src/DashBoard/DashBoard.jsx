import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  const [open, setOpen] = useState(true);
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
          <ul className="navbar menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {/* student */}
            <li>
              <NavLink to="myClasses">My Selected Classes</NavLink>
            </li>
            <li>
              <NavLink to="myEnroll">My Enroll Classes</NavLink>
            </li>
            <li>
              <NavLink to="paymentHistory">Payment History</NavLink>
            </li>
            {/* instruction */}
            <li>
              <NavLink to="addClass">Add A Classes</NavLink>
            </li>
            <li>
              <NavLink to="myAddedClasses">My Classes</NavLink>
            </li>
            <li>
              <NavLink to="feedBack">FeedBack</NavLink>
            </li>
            {/* Admin */}
            <li>
              <NavLink to="manageClasses">Manage Classes</NavLink>
            </li>
            <li>
              <NavLink to="manageUsers">Manage Users</NavLink>
            </li>
            <div className="divider"></div>{" "}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
