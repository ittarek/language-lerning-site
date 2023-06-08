import React from "react";

const SectionTitle = ({ title, summary }) => {
  return (
    <div className="  mx-auto  text-center  md:w-4/12 ">
      <h3 className="text-4xl  uppercase py-2 my-4   ">{title}</h3>
      <p className="text-purple-500 mb-4   ">{summary}</p>
    </div>
  );
};

export default SectionTitle;
