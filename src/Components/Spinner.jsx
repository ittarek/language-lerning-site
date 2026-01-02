// import { MoonLoader, ScaleLoader } from "react-spinners";

// const Spinner = () => {
//   return (
//     <div
//       className="
//       h-[70vh]
//       flex 
//       flex-col 
//       justify-center 
//       items-center 
//     "
//     >
//       <MoonLoader size={100} color="red" />
//     </div>
//   );
// };

// export default Spinner;
import { ScaleLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className="h-[70vh] flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-6 p-10 rounded-2xl bg-white shadow-lg">
                {/* Logo / App Name */}
                <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
                    Dashboard
                </h1>

                {/* Loader */}
                <ScaleLoader
                    height={40}
                    width={5}
                    radius={4}
                    margin={3}
                    color="#2563EB" // Tailwind blue-600
                />

                {/* Loading Text */}
                <p className="text-sm text-gray-500 animate-pulse">
                    Loading data, please wait…
                </p>
            </div>
        </div>
    );
};

export default Spinner;
