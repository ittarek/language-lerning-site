import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../../Provider/AuthProvider";
import Swal from "sweetalert2";
const Register = () => {
  const { registration, userUpdating } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const ref = useRef();
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
  const handleShowPassword2 = () => {
    setShowPassword2((preve) => !preve);
  };
  const onSubmit = (data) => {
    setError("");

    registration(data.email, data.password)
      .then((result) => {
        const registerUser = result.user;
        // console.log(registerUser);
        userUpdating(
          result.user,
          data.name,
          data.photoURL,
          data.confirmPassword
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration has been successFul",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
    if (data.password.length < 6) {
      setError("Password Al least 6 Character");
      return;
    }
  };

  return (
    <div>
      <div className="py-10 img-gradient mb-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-image">
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <Link to="" className="text-purple-500 font-semibold">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    className="border border-gray-400 py-1 px-2 w-full"
                  />{" "}
                  {errors.name && (
                    <span className="text-red-600">Name field is required</span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    {...register("email", { required: true })}
                    className="border border-gray-400 py-1 px-2 w-full"
                  />{" "}
                  {errors.email && (
                    <span className="text-red-600">
                      Email field is required
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,

                      pattern:
                        /(?=.*[A-Z].)(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    className="border border-gray-400 py-1 px-2 w-full"
                  />{" "}
                  <span
                    className="-right-[300px] -top-8 relative text-xl cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  <span className="text-red-600">{error}</span>
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">
                      Password field is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600">
                      Password must be 6 character
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600">
                      Password must be 1 spacial character 1 uppercase 1 number
                      1 lowercase{" "}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <input
                  type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                    className="border border-gray-400 py-1 px-2 w-full"
                  /> <span
                  className="-right-[300px] -top-8 relative text-xl cursor-pointer"
                  onClick={handleShowPassword2}
                >
                  {showPassword2 ? <FaEye /> : <FaEyeSlash />}
                </span>
                  {errors.confirmPassword && (
                    <span className="text-red-600">
                      Confirm Password is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("photoURL", { required: true })}
                    placeholder="Photo URL"
                    className="input input-bordered"
                  />
                  {errors.photoURL && (
                    <span className="text-red-600">Photo URL is required</span>
                  )}
                </div>
                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400" />
                  <span>
                    I accept the{" "}
                    <Link to="" className="text-purple-500 font-semibold">
                      Terms of Use
                    </Link>{" "}
                    &{" "}
                    <Link to="" className="text-purple-500 font-semibold">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
                <div className="mt-5">
                  <button className="w-full bg-purple-500 py-3 text-center text-white">
                    <input type="submit" value="Register Now" />
                  </button>
                </div>
                <span>
                  Already Have an Account ?{" "}
                  <Link to="/login" className="text-purple-500">
                    Login
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
