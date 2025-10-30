import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <header className="bg-white shadow flex items-center px-4 sm:px-6 py-3 pl-16 lg:pl-6 relative">
      {/* Centered Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 absolute left-1/2 -translate-x-1/2">
        <span className="hidden sm:inline">Lichtman's Liquor Store</span>
        <span className="sm:hidden">Lichtman's</span>
      </h1>

      {/* Logout Button */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="bg-rose-800 text-white px-3 sm:px-4 py-2 rounded hover:bg-rose-900 transition-colors flex items-center gap-2 text-sm sm:text-base flex-shrink-0 ml-auto cursor-pointer"
      >
        <FiLogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out of your admin account?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-rose-800 hover:bg-rose-900 text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
