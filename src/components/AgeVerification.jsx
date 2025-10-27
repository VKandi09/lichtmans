import { useState } from "react";

const AgeVerificationModal = ({ onVerified }) => {
  const [error, setError] = useState("");

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    onVerified(true);
  };

  const handleNo = () => {
    setError("Sorry, you must be 21 or older to enter this site.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-sm z-50">
      {/* Modal content */}
      <div className="relative bg-white/90 p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-lg w-[full]">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
          Are you 21 years of age or older?
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
          You must be of legal drinking age to enter this site.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
          <button
            onClick={handleYes}
            className="bg-rose-900 text-white font-semibold px-6 sm:px-8 py-3 rounded-full hover:bg-rose-800 transition text-sm sm:text-base w-full sm:w-auto"
          >
            Yes, I am 21+
          </button>
          <button
            onClick={handleNo}
            className="bg-gray-200 text-gray-800 font-semibold px-6 sm:px-8 py-3 rounded-full hover:bg-gray-300 transition text-sm sm:text-base w-full sm:w-auto"
          >
            No, Exit
          </button>
        </div>

        {error && (
          <p className="text-red-600 mt-4 font-medium text-sm sm:text-base">{error}</p>
        )}

        <p className="text-xs text-gray-500 mt-5 sm:mt-6">
          By entering this site, you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;

