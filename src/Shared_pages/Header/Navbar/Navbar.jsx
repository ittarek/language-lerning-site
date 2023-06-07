import React from "react";
import Container from "../../../Componets/Container";
import { NavLink } from "react-router-dom";

const Navbar = () => {

     const navItems = <> 
     <li><NavLink to='/'>Home</NavLink></li>
 <li>    <NavLink>Instructor</NavLink></li>
    <li> <NavLink>Classes</NavLink></li>
   <li>  <NavLink>Blog</NavLink></li>
  <li>   <NavLink>Daily News</NavLink></li>
     </>
   
  return (
    <div className="head-nav">
      <Container>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Language Center</a>
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
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      {/* navbar main */}
      <div className=" bg-slate-400">
      <Container>  <div className="navbar sm:flex justify-between items-center ">
        
           
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
           {navItems}
          </ul>
    
        
      </div>
      <div className="flex-1 justify-between items-center">
        <div className="activ hidden  lg:flex ">
          <ul className="menu menu-horizontal px-1">
           {navItems}
          </ul>
        </div>
      
      </div>
        <div className="">
      
        </div>
   
  </div> </Container>
      </div>
    </div>
  );
};

export default Navbar;
