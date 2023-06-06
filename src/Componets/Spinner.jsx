import { MoonLoader, ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <MoonLoader size={100} color="red" />
    </div>
  );
};

export default Spinner;
