import React from "react";
import Container from "../../../Componets/Container";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/website logo.png";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        {" "}
        <NavLink>Instructor</NavLink>
      </li>
      <li>
        {" "}
        <NavLink>Classes</NavLink>
      </li>
      <li>
        {" "}
        <NavLink>Blog</NavLink>
      </li>
      <li>
        {" "}
        <NavLink>Daily News</NavLink>
      </li>
    </>
  );

  return (
    <div className="head-nav">
      <Container>
        <div className="navbar sticky z-50 ">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost  text-xl">
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
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
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
                <li>
                  <Link to="dashboard">DashBoard</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      {/* navbar main */}

      <Container>
        {" "}
        <div className="navbar sticky  z-10 bg-opacity-30  bg-black  text-white ">
          <div className="">
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
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-700 rounded-box w-52 text-white"
              >
                {navItems}
              </ul>
            </div>
          </div>
          <div className="navbar">
            <div className=" w-full flex justify-between items-center">
              <div className=" hidden  lg:flex ">
                <ul className="menu menu-horizontal px-1 text-white">
                  {navItems}
                </ul>
              </div>
              <div className=" text-white flex  ">
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
