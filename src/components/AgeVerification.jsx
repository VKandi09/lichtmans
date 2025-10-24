// import { useState } from "react";

// const AgeVerificationModal = ({ onVerified }) => {
//   const [age, setAge] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userAge = parseInt(age, 10);

//     if (isNaN(userAge)) {
//       setError("Please enter a valid age.");
//       return;
//     }

//     if (userAge >= 21) {
//       localStorage.setItem("ageVerified", "true"); // Remember user verification
//       onVerified(true);
//     } else {
//       setError("You must be 21 or older to enter this site.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded-lg max-w-sm w-full text-center">
//         <h2 className="text-2xl font-bold mb-4">Are you 21 or older?</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="number"
//             placeholder="Enter your age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             className="border p-2 mb-4 w-full rounded"
//           />
//           {error && <p className="text-red-500 mb-2">{error}</p>}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Enter
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AgeVerificationModal;

import { useState } from "react";

const AgeVerificationModal = ({ onVerified }) => {
  const [error, setError] = useState("");

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    onVerified(true);
  };

  const handleNo = () => {
    setError("Sorry, you must be 21 or older to enter this site.");
    // Optional: redirect to a safe site, e.g., Google
    // window.location.href = "https://www.google.com";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-sm z-50">
      {/* Background image behind modal */}
      {/* <div className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1601315576601-ec4e5c5e2b7f?auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div> */}

      {/* Modal content */}
      <div className="relative bg-white/90 p-8 rounded-2xl shadow-2xl text-center max-w-lg w-[90%]">
        {/* <img
          src="/logo.png" // replace with your logo path
          alt="Store Logo"
          className="mx-auto w-20 mb-4"
        /> */}

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Are you 21 years of age or older?
        </h2>
        <p className="text-gray-600 mb-6">
          You must be of legal drinking age to enter this site.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={handleYes}
            className="bg-rose-900 text-white font-semibold px-8 py-3 rounded-full hover:bg-rose-800 transition"
          >
            Yes, I am 21+
          </button>
          <button
            onClick={handleNo}
            className="bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-300 transition"
          >
            No, Exit
          </button>
        </div>

        {error && (
          <p className="text-red-600 mt-4 font-medium">{error}</p>
        )}

        <p className="text-xs text-gray-500 mt-6">
          By entering this site, you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;

