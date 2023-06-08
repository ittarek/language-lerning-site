import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home_page/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register/Register";
import Instructors from "../Pages/Instructors_page/Instructors";
export const router = createBrowserRouter([
  {
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
    ],
  },
]);
