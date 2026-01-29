import { Outlet } from 'react-router-dom';
import Navbar from '../Shared_pages/Header/Navbar/Navbar';
import Footer from '../Shared_pages/Footer/Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import {ScrollToTop} from '../Components/Shared/ScrollToTop';

const MainLayOut = () => {
  const pathName = window.location.pathname;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);
  return (
    <>
      {/* {pathName !== '/' && <ScrollToTop />} */}
      <ScrollToTop />
      <Navbar />
      <div className="md:min-h-[calc(100vh-140px)]">
        {/* {isLoading ? <PageLoadingSpinner /> :         <Outlet />} */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayOut;
