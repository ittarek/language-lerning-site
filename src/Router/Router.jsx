import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import MainLayOut from '../LayOut/MainLayOut';
import DashBoardLayOut from '../LayOut/DashBoardLayOut';

import PrivetRoute from './PrivetRoute';
import AdminROutes from './AdminROutes';
import { LoadingState } from '../Components/Shared/FetchStates/LoadingState';
import RoleBasedDashboard from './RoleBasedDashboard';
import { getApiUrl } from '../config/api/Config';

// 🔹 Public Pages (Lazy)
const Home = lazy(() => import('../Pages/Home_page/Home'));
const Login = lazy(() => import('../Pages/Login/Login'));
const Register = lazy(() => import('../Pages/Register/Register'));
const Instructors = lazy(() => import('../Pages/Instructors_page/InstructorsPage'));
const Classes = lazy(() => import('../Pages/Classes/Classes'));
const Blog = lazy(() => import('../Pages/Blog/Blog'));
const BlogDetail = lazy(() => import('../Pages/Blog/BlogDetail'));
const News = lazy(() => import('../Pages/News/News'));
const NewsDetail = lazy(() => import('../Pages/News/NewsDetail'));
const EventDetail = lazy(() => import('../Components/Event/EventDetail'));
const ErrorPage = lazy(() => import('../Pages/ErrorPage'));

// 🔹 Details Pages (Lazy)
const ClassDetails = lazy(() =>
  import('../Pages/Home_page/Popular_section/ClassDetails')
);
const InstructorDetails = lazy(() =>
  import('../Pages/Home_page/Instructor/InstructorDetails')
);
const ComingSoonCourseDetails = lazy(() =>
  import('../Pages/Home_page/ComingSoonCourseDetails')
);
const TradingArticleDetails = lazy(() =>
  import('../Pages/Home_page/TradingArticle/TradingArticleDetails')
);
const WishlistSystem = lazy(() =>
  import('../Pages/Home_page/WishlistSystem/WishlistSystem')
);

// 🔹 Pricing & Checkout Pages (Lazy)
const PricingPage = lazy(() => import('../Pages/Home_page/Pricing/PricingPage'));
const ProcessingPage = lazy(() => import('../Pages/Home_page/Pricing/ProcessingPage'));
const SuccessPage = lazy(() => import('../Pages/Home_page/Pricing/SuccessPage'));
const CheckoutPage = lazy(() => import('../Pages/Home_page/Pricing/CheckoutPage'));
const ContactSalesPage = lazy(() =>
  import('../Pages/Home_page/Pricing/ContactSalesPage')
);

// 🔹 About Pages (Lazy)
const CourseExplorerPage = lazy(() =>
  import('../Pages/Home_page/AboutUs/CourseExplorerPage')
);
const DetailedAboutPage = lazy(() =>
  import('../Pages/Home_page/AboutUs/DetailedAboutPage')
);

// 🔹 Dashboard Pages (Lazy)
const DashBoard = lazy(() => import('../DashBoard/DashBoard'));
const StudentHome = lazy(() => import('../DashBoard/StudenDashBoard/StudentHome'));
const MySelectClasses = lazy(() =>
  import('../DashBoard/StudenDashBoard/MySelectClasses')
);
const MyEnroll = lazy(() => import('../DashBoard/StudenDashBoard/MyEnroll'));
const Payment = lazy(() => import('../DashBoard/StudenDashBoard/Payment/Payment'));
const PaymentHistory = lazy(() => import('../DashBoard/StudenDashBoard/PaymentHistory'));

const InstructorHome = lazy(() =>
  import('../DashBoard/InstructionDashBoard/InstructorHome')
);
const AddClass = lazy(() => import('../DashBoard/InstructionDashBoard/AddClass'));
const MyAddedClasses = lazy(() =>
  import('../DashBoard/InstructionDashBoard/MyAddedClasses')
);
const InsTructionFeedBack = lazy(() =>
  import('../DashBoard/InstructionDashBoard/InsTructionFeedBack')
);

const ManageClasses = lazy(() => import('../DashBoard/AdminDashBoard/ManageClasses'));
const ManageUsers = lazy(() => import('../DashBoard/AdminDashBoard/ManageUsers'));
const AdminHome = lazy(() => import('../DashBoard/AdminDashBoard/AdminHome'));
const AdminFeedBack = lazy(() => import('../DashBoard/AdminDashBoard/AdminFeedBack'));

// 🔹 Reusable Loader
const Loader = () => (
  <div className="">
    <LoadingState />
  </div>
);

const API_URL = getApiUrl();

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayOut />,
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/instructors',
        element: (
          <Suspense fallback={<Loader />}>
            <Instructors />
          </Suspense>
        ),
      },
      {
        path: '/instructor/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <InstructorDetails />
          </Suspense>
        ),
      },
      {
        path: '/classes',
        element: (
          <Suspense fallback={<Loader />}>
            <Classes />
          </Suspense>
        ),
      },
      {
        path: '/checkout',
        element: (
          <Suspense fallback={<Loader />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
      {
        path: '/processing',
        element: (
          <Suspense fallback={<Loader />}>
            <ProcessingPage />
          </Suspense>
        ),
      },
      {
        path: '/success',
        element: (
          <Suspense fallback={<Loader />}>
            <SuccessPage />
          </Suspense>
        ),
      },
      {
        path: '/contact-sales',
        element: (
          <Suspense fallback={<Loader />}>
            <ContactSalesPage />
          </Suspense>
        ),
      },
      {
        path: '/class/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <ClassDetails />
          </Suspense>
        ),
      },
      {
        path: '/coming-soon-course/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <ComingSoonCourseDetails />
          </Suspense>
        ),
      },
      {
        path: '/trending-article/:slug',
        element: (
          <Suspense fallback={<Loader />}>
            <TradingArticleDetails />
          </Suspense>
        ),
      },
      {
        path: '/blog',
        element: (
          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: '/blog/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <BlogDetail />
          </Suspense>
        ),
      },
      {
        path: '/news',
        element: (
          <Suspense fallback={<Loader />}>
            <News />
          </Suspense>
        ),
      },
      {
        path: '/news/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <NewsDetail />
          </Suspense>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <Suspense fallback={<Loader />}>
            <WishlistSystem />
          </Suspense>
        ),
      },
      {
        path: '/events/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <EventDetail />
          </Suspense>
        ),
      },
      {
        path: '/CourseExplorerPage',
        element: (
          <Suspense fallback={<Loader />}>
            <CourseExplorerPage />
          </Suspense>
        ),
      },
      {
        path: '/ContactUs',
        element: (
          <Suspense fallback={<Loader />}>
            <DetailedAboutPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: 'dashboard',
    element: <DashBoardLayOut />,
    children: [
      // Default dashboard redirect
      {
        path: '',
        element: <RoleBasedDashboard />,
      },

      // Student Routes
      {
        path: 'studentHome',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <StudentHome />
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: 'mySelectedClasses',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <MySelectClasses />
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: 'myEnroll',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <MyEnroll />
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: 'mySelectedClasses/payment/:id',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <Payment />
            </Suspense>
          </PrivetRoute>
        ),
        loader: ({ params }) => fetch(`${API_URL}/getSelectedClass/${params.id}`),
      },
      {
        path: 'paymentHistory',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <PaymentHistory />
            </Suspense>
          </PrivetRoute>
        ),
      },

      // Instructor Routes
      {
        path: 'instructorHome',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <InstructorHome />
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: 'addClass',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <AddClass />
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: 'myAddedClasses',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <MyAddedClasses />
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: 'myAddedClasses/instructorFeedback',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <InsTructionFeedBack />
            </Suspense>
          </PrivetRoute>
        ),
      },

      // Admin Routes
      {
        path: 'adminHome',
        element: (
          <AdminROutes>
            <Suspense fallback={<Loader />}>
              <AdminHome />
            </Suspense>
          </AdminROutes>
        ),
      },
      {
        path: 'manageClasses',
        element: (
          <AdminROutes>
            <Suspense fallback={<Loader />}>
              <ManageClasses />
            </Suspense>
          </AdminROutes>
        ),
      },
      {
        path: 'manageUsers',
        element: (
          <AdminROutes>
            <Suspense fallback={<Loader />}>
              <ManageUsers />
            </Suspense>
          </AdminROutes>
        ),
      },
      {
        path: 'manageClasses/adminFeedBack/:id',
        element: (
          <AdminROutes>
            <Suspense fallback={<Loader />}>
              <AdminFeedBack />
            </Suspense>
          </AdminROutes>
        ),
        loader: ({ params }) => fetch(`${API_URL}/AllClass/${params.id}`),
      },

      // Original dashboard (optional)
      {
        path: 'dashboard',
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loader />}>
              <DashBoard />
            </Suspense>
          </PrivetRoute>
        ),
      },
    ],
  },
]);
