import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home_page/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Instructors from "../Pages/Instructors_page/Instructors";
import Classes from "../Pages/Classes/Classes";
import Blog from "../Pages/Blog/Blog";
import News from "../Pages/News/News";

import PrivetRoute from "./PrivetRoute";
import DashBoardLayOut from "../LayOut/DashBoardLayOut";
import DashBoard from "../DashBoard/DashBoard";
import PaymentHistory from "../DashBoard/StudenDashBoard/PaymentHistory";

import MyEnroll from "../DashBoard/StudenDashBoard/MyEnroll";
import AddClass from "../DashBoard/InstructionDashBoard/AddClass";

import MyAddedClasses from "../DashBoard/InstructionDashBoard/MyAddedClasses";
import InsTructionFeedBack from "../DashBoard/InstructionDashBoard/InsTructionFeedBack";
import ManageClasses from "../DashBoard/AdminDashBoard/ManageClasses";
import ManageUsers from "../DashBoard/AdminDashBoard/ManageUsers";
import AdminROutes from "./AdminROutes";
import InstructorHome from "./../DashBoard/InstructionDashBoard/InstructorHome";
import ErrorPage from "../Pages/ErrorPage";
import MySelectClasses from "../DashBoard/StudenDashBoard/MySelectClasses";
import Payment from "../DashBoard/StudenDashBoard/Payment/Payment";
import AdminHome from "../DashBoard/AdminDashBoard/AdminHome";
import AdminFeedBack from "../DashBoard/AdminDashBoard/AdminFeedBack";
import StudentHome from "../DashBoard/StudenDashBoard/StudentHome";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/news",
        element: <News></News>,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashBoardLayOut></DashBoardLayOut>,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivetRoute>
            {" "}
            <DashBoard></DashBoard>
          </PrivetRoute>
        ),
      },
      // Student Route
      {
        path: "studentHome",
        element: <StudentHome></StudentHome>,
      },
      {
        path: "mySelectedClasses",
        element: <MySelectClasses></MySelectClasses>,
      },
      {
        path: "myEnroll",
        element: <MyEnroll></MyEnroll>,
      },
      {
        path: "mySelectedClasses/payment/:id",
        element: <Payment></Payment>,
      },

      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      // Instruction Route
      {
        path: "instructorHome",
        element: <InstructorHome></InstructorHome>,
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myAddedClasses",
        element: <MyAddedClasses></MyAddedClasses>,
      },
      {
        path: "myAddedClasses/instructorFeedback",
        element: <InsTructionFeedBack></InsTructionFeedBack>,
      },
      // Admin Route
      {
        path: "manageClasses",
        element: (
          <AdminROutes>
            <ManageClasses></ManageClasses>
          </AdminROutes>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminROutes>
            <ManageUsers></ManageUsers>
          </AdminROutes>
        ),
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "manageClasses/adminFeedBack/:id",
        element: <AdminFeedBack></AdminFeedBack>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/AllClass/${params.id}`),
      },
    ],
  },
]);
