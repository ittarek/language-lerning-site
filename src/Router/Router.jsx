import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home_page/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register/Register";
import Instructors from "../Pages/Instructors_page/Instructors";
import Classes from "../Pages/Classes/Classes";
import Blog from "../Pages/Blog/Blog";
import News from "../Pages/News/News";
import SelectClass from "../Pages/Classes/SelectClass";
import PrivetRoute from "./PrivetRoute";
import DashBoardLayOut from "../LayOut/DashBoardLayOut";
import DashBoard from "../DashBoard/DashBoard";
import PaymentHistory from "../DashBoard/StudenDashBoard/PaymentHistory";
import MyClasses from "../DashBoard/StudenDashBoard/MyClasses";
import MyEnroll from "../DashBoard/StudenDashBoard/MyEnroll";
import AddClass from "../DashBoard/InstructionDashBoard/AddClass";

import MyAddedClasses from "../DashBoard/InstructionDashBoard/MyAddedClasses";
import InsTructionFeedBack from "../DashBoard/InstructionDashBoard/InsTructionFeedBack";
import ManageClasses from "../DashBoard/AdminDashBoard/ManageClasses";
import ManageUsers from "../DashBoard/AdminDashBoard/ManageUsers";
import AdminROutes from "./AdminROutes";
import InstructorHome from "./../DashBoard/InstructionDashBoard/InstructorHome";
import ErrorPage from "../Pages/ErrorPage";

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
      {
        path: "/selectClass",
        element: (
          <PrivetRoute>
            <SelectClass></SelectClass>
          </PrivetRoute>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        {" "}
        <DashBoardLayOut></DashBoardLayOut>
      </PrivetRoute>
    ),
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
        path: "myClasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "myEnroll",
        element: <MyEnroll></MyEnroll>,
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
        path: "myAddedClasses/feedback",
        element: <InsTructionFeedBack></InsTructionFeedBack>,
      },
      // Admin Route
      {
        path: "manageClasses",
        element: (
          <AdminROutes>
            {" "}
            <ManageClasses></ManageClasses>
          </AdminROutes>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminROutes>
            {" "}
            <ManageUsers></ManageUsers>
          </AdminROutes>
        ),
      },
    ],
  },
]);
