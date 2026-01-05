import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayOut from "../LayOut/MainLayOut";
import DashBoardLayOut from "../LayOut/DashBoardLayOut";

import PrivetRoute from "./PrivetRoute";
import AdminROutes from "./AdminROutes";
import { LoadingState } from "../Components/Shared/FetchStates/FetchStates";
import RoleBasedDashboard from "./RoleBasedDashboard";
import ClassDetails from "../Pages/Home_page/Popular_section/ClassDetails";
import InstructorDetails from "../Pages/Home_page/Instructor/InstructorDetails";
import ComingSoonCourseDetails from "../Pages/Home_page/ComingSoonCourseDetails";


// 🔹 Public Pages (Lazy)
const Home = lazy(() => import("../Pages/Home_page/Home"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Register = lazy(() => import("../Pages/Register/Register"));
const Instructors = lazy(() => import("../Pages/Instructors_page/InstructorsPage"));
const Classes = lazy(() => import("../Pages/Classes/Classes"));
const Blog = lazy(() => import("../Pages/Blog/Blog"));
const BlogDetail = lazy(() => import("../Pages/Blog/BlogDetail"));
const News = lazy(() => import("../Pages/News/News"));
const NewsDetail = lazy(() => import("../Pages/News/NewsDetail"));
const EventDetail = lazy(() => import("../Components/Event/EventDetail"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));

// 🔹 Dashboard Pages (Lazy)
const DashBoard = lazy(() => import("../DashBoard/DashBoard"));
const StudentHome = lazy(() => import("../DashBoard/StudenDashBoard/StudentHome"));
const MySelectClasses = lazy(() => import("../DashBoard/StudenDashBoard/MySelectClasses"));
const MyEnroll = lazy(() => import("../DashBoard/StudenDashBoard/MyEnroll"));
const Payment = lazy(() => import("../DashBoard/StudenDashBoard/Payment/Payment"));
const PaymentHistory = lazy(() => import("../DashBoard/StudenDashBoard/PaymentHistory"));

const InstructorHome = lazy(() => import("../DashBoard/InstructionDashBoard/InstructorHome"));
const AddClass = lazy(() => import("../DashBoard/InstructionDashBoard/AddClass"));
const MyAddedClasses = lazy(() => import("../DashBoard/InstructionDashBoard/MyAddedClasses"));
const InsTructionFeedBack = lazy(() =>
    import("../DashBoard/InstructionDashBoard/InsTructionFeedBack")
);

const ManageClasses = lazy(() => import("../DashBoard/AdminDashBoard/ManageClasses"));
const ManageUsers = lazy(() => import("../DashBoard/AdminDashBoard/ManageUsers"));
const AdminHome = lazy(() => import("../DashBoard/AdminDashBoard/AdminHome"));
const AdminFeedBack = lazy(() => import("../DashBoard/AdminDashBoard/AdminFeedBack"));

// 🔹 Reusable Loader
const Loader = () => <div className=""><LoadingState /></div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        errorElement: (
            <Suspense fallback={<Loader />}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/login",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "/register",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "/instructors",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Instructors />
                    </Suspense>
                ),
            },
            {
                path: "/instructor/:id",
                element: <InstructorDetails/>

            },
            {
                path: "/classes",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Classes />
                    </Suspense>
                ),
            },

            {
                path: "/class/:id",
                element: <ClassDetails />
          },
            {
  path: '/coming-soon-course/:id',
  element: <ComingSoonCourseDetails />
},
            {
                path: "/blog",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Blog />
                    </Suspense>
                ),
            },
            {
                path: "/blog/:id",
                element: (
                    <Suspense fallback={<Loader />}>
                        <BlogDetail />
                    </Suspense>
                ),
            },
            {
                path: "/news",
                element: (
                    <Suspense fallback={<Loader />}>
                        <News />
                    </Suspense>
                ),
            },
            {
                path: "/news/:id",
                element: (
                    <Suspense fallback={<Loader />}>
                        <NewsDetail />
                    </Suspense>
                ),
            },
            {
                path: "/events/:id",
                element: (
                    <Suspense fallback={<Loader />}>
                        <EventDetail />
                    </Suspense>
                ),
            },
        ],
    },


    {
        path: "dashboard",
        element: <DashBoardLayOut />,
        children: [
            // Default dashboard redirect
            {
                path: "",
                element: <RoleBasedDashboard />
            },

            // Student Routes
            {
                path: "studentHome",
                element: (
                    <PrivetRoute>
                        <Suspense fallback={<Loader />}>
                            <StudentHome />
                        </Suspense>
                    </PrivetRoute>
                ),
            },
            {
                path: "mySelectedClasses",
                element: (
                    <Suspense fallback={<Loader />}>
                        <MySelectClasses />
                    </Suspense>
                ),
            },
            {
                path: "myEnroll",
                element: (
                    <Suspense fallback={<Loader />}>
                        <MyEnroll />
                    </Suspense>
                ),
            },
            {
                path: "mySelectedClasses/payment/:id",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Payment />
                    </Suspense>
                ),
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_API_URL}/getSelectedClass/${params.id}`),
            },
            {
                path: "paymentHistory",
                element: (
                    <Suspense fallback={<Loader />}>
                        <PaymentHistory />
                    </Suspense>
                ),
            },

            // Instructor Routes
            {
                path: "instructorHome",
                element: (
                    <PrivetRoute>
                        <Suspense fallback={<Loader />}>
                            <InstructorHome />
                        </Suspense>
                    </PrivetRoute>
                ),
            },
            {
                path: "addClass",
                element: (
                    <PrivetRoute>
                        <Suspense fallback={<Loader />}>
                            <AddClass />
                        </Suspense>
                    </PrivetRoute>
                ),
            },
            {
                path: "myAddedClasses",
                element: (
                    <PrivetRoute>
                        <Suspense fallback={<Loader />}>
                            <MyAddedClasses />
                        </Suspense>
                    </PrivetRoute>
                ),
            },
            {
                path: "myAddedClasses/instructorFeedback",
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
                path: "adminHome",
                element: (
                    <AdminROutes>
                        <Suspense fallback={<Loader />}>
                            <AdminHome />
                        </Suspense>
                    </AdminROutes>
                ),
            },
            {
                path: "manageClasses",
                element: (
                    <AdminROutes>
                        <Suspense fallback={<Loader />}>
                            <ManageClasses />
                        </Suspense>
                    </AdminROutes>
                ),
            },
            {
                path: "manageUsers",
                element: (
                    <AdminROutes>
                        <Suspense fallback={<Loader />}>
                            <ManageUsers />
                        </Suspense>
                    </AdminROutes>
                ),
            },
            {
                path: "manageClasses/adminFeedBack/:id",
                element: (
                    <AdminROutes>
                        <Suspense fallback={<Loader />}>
                            <AdminFeedBack />
                        </Suspense>
                    </AdminROutes>
                ),
                loader: ({ params }) =>
                    fetch(`${import.meta.env.VITE_API_URL}/AllClass/${params.id}`),
            },

            // Original dashboard (optional)
            {
                path: "dashboard",
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
