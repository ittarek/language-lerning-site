import React from "react";
import { FaGoogle } from "react-icons/fa";

const SocailLogin = () => {
  return (
    <div className="mx-auto w-1/2">
      <button className="w-full -mt-20 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
        <FaGoogle className="inline "></FaGoogle> Continue With Google
      </button>
    </div>
  );
};

export default SocailLogin;
