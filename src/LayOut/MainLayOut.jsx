import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../Shared_pages/Header/Navbar/Navbar';
import Footer from '../Shared_pages/Footer/Footer';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import PageLoadingSpinner from '../Components/Spinner/PageLoadingSpinner';
import AOS from 'aos';
import { ScrollToTop } from '../Components/Shared/ScrollToTop';

const MainLayOut = () => {
  const { spinner } = useContext(AuthContext);
  const navigation = useNavigation();
  const pathName = window.location.pathname;
  console.log('path', pathName);

  // Show loading spinner when:
  // 1. Auth is loading (spinner = true)
  // 2. Navigating to new page (navigation.state = 'loading')
  const isLoading = spinner || navigation.state === 'loading';
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);
  return (
    <>
      {pathName !== '/' && <ScrollToTop />}
      <Navbar />
      <div className="md:min-h-[calc(100vh-140px)]">
        {isLoading ? <PageLoadingSpinner /> : <Outlet />}
      </div>
      <Footer />
    </>
  );
};

export default MainLayOut;
