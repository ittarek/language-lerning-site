import React, { useContext } from "react";

import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/website logo.png";
import Container from "./../../../Componets/Container";
import { AuthContext } from "../../../Provider/AuthProvider";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import Mood from "./Mood";

const Navbar = () => {
  const { user, loggedOut } = useContext(AuthContext);

  const handleLogOut = () => {
    loggedOut().then();
  };

  // tooltip
  const handleToltip = () => {
    tippy("#MyTool", {
      content: user?.displayName || "NoName",
    });
  };
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to='/instructors'>Instructor</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to='/classes'>Classes</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to='/blog'>Blog</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to='/news'>Daily News</NavLink>
      </li>
    </>
  );

  return (
    <div className="head-nav">
      <Container>
        <div className="navbar  fixed   top-0 z-10 bg-base-200 px-4 mx-0">
          <div className="flex-1">
            <Link to="/" className="">
              {" "}
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>{" "}
            {user?.email ? (
              ""
            ) : (
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
            )}
            <div className="dropdown dropdown-end">
              {user?.email && (
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {" "}
                  <div
                    className="w-10 rounded-full"
                    id="MyTool"
                    onMouseOver={handleToltip}
                  >
                    {<img src={user?.photoURL} />}
                  </div>{" "}
                </label>
              )}

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-700 rounded-box w-52 text-white "
              >
                <li>
                  <Link className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                {user?.email && (
                  <li>
                    <Link to="/dashboard">DashBoard</Link>
                  </li>
                )}
                {user?.email ? (
                  <li>
                    <button onClick={handleLogOut}>
                      {" "}
                      <Link>Logout</Link>
                    </button>
                  </li>
                ) : (
                  <li>
                    {" "}
                    <Link to="/login">Login</Link>
                  </li>
                )}

                {/* displayName */}
              
              </ul>  
            </div>
          </div>  <li><Mood></Mood></li>
        </div>
      </Container>
      {/* navbar main */}

      <Container>
        {" "}
        <div className="navbar top-14 z-10 bg-opacity-30 absolute font-bold  text-white">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  mt-3 p-2 shadow bg-slate-700 rounded-box w-52 text-white  "
            >
              {navItems}
            </ul>
          </div>

          <div className="navbar">
            <div className=" w-full flex justify-between items-center">
              <div className=" hidden  lg:flex ">
                <ul className="menu menu-horizontal my-auto  text-white  text-xl">
                  {navItems}
                </ul>
              </div>
              <div className="text-white flex mr-10">
                <Link className="mx-4">
                  {" "}
                  <FaFacebookF></FaFacebookF>
                </Link>
                <Link className="mx-4">
                  {" "}
                  <FaTwitter></FaTwitter>
                </Link>
                <Link className="mx-4">
                  {" "}
                  <FaGoogle></FaGoogle>
                </Link>
                <Link className="mx-4">
                  {" "}
                  <FaYoutube></FaYoutube>
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </Container>
    </div>
  );
};

export default Navbar;
