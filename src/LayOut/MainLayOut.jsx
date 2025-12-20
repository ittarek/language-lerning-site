import { Outlet } from "react-router-dom";
import Navbar from "../Shared_pages/Header/Navbar/Navbar";
import Footer from "../Shared_pages/Footer/Footer";

const MainLayOut = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="md:min-h-[calc(100vh-140px)]">      <Outlet></Outlet></div>
            <Footer></Footer>
        </>
    );
};

export default MainLayOut;
