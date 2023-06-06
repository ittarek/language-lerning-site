import { Outlet } from "react-router-dom";
import Navbar from "../Shared_pages/Header/Navbar/Navbar";
import Footer from "../Shared_pages/Footer/Footer";

const MainLayOut = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayOut;
