import React, { useContext, useState } from "react";
import "./Login.css";
import loginImg from "../../assets/login/login.jpg";
import Container from "../../Componets/Container";
import SocailLogin from "../../Componets/Socail/SocailLogin";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // password show function
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "login  has been successFul",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
       setError(error.message);
      });
  };
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full mb-10">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={loginImg} alt="" />
        </div>

        <div className="bg-gray-900 flex flex-col justify-center ">
       
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[400px] w-full mx-auto rounded-lg  p-8 px-8"
          >
               <p className="text-red-400">{error}</p>
            <h2 className="text-4xl dark:text-white font-bold text-center">
              SIGN IN
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Email</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                name="email"
                {...register("email", { required: true })}
              />{" "}
              {errors.email && (
                <span className="text-red-600">Email field is required</span>
              )}
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", { required: true })}
              />{" "}
              <span
                className="-right-[300px] -top-8 relative text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.password && (
                <span className="text-red-600">Password field is required</span>
              )}
            </div>
            <div className="flex justify-between text-gray-400 py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
              <p>Forgot Password</p>
            </div>
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
              {" "}
              <input type="submit" value="SIGNIN" />
            </button>
            <span className="text-white">
              New To Language Center? Please !{" "}
              <Link to="/register" className="text-green-400">
                SignUp
              </Link>
            </span>
          </form>
          <SocailLogin></SocailLogin>

          {errors.exampleRequired && (
            <span className="text-red-400">This field is required</span>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;
