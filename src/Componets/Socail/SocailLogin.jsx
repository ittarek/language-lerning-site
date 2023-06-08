import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocailLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const handleLogin = () =>{
googleLogin()
.then(result =>{
  const loggedUser = result.user;
  console.log(loggedUser);
  navigate(from, {replace: true})
}).catch(error =>{
  console.log(error.message);
})
  }
  return (
    <div className="mx-auto w-1/2">
      <button onClick={handleLogin} className="w-full -mt-20 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
        <FaGoogle className="inline "></FaGoogle> Continue With Google
      </button>
    </div>
  );
};

export default SocailLogin;
