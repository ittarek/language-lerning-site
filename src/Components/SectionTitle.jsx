import React from "react";

const SectionTitle = ({ title, summary }) => {
  return (
    <div className="  mx-auto  text-center  md:w-4/12 px-2 ">
      <h3 className="text-4xl  uppercase py-2    ">{title}</h3>
      <p className="text-slate-500 mb-4 text-center    ">{summary}</p>
    </div>
  );
};

export default SectionTitle;
