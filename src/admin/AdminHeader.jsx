import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
    }
  };

  return (
    <header className="bg-white shadow flex items-center px-4 sm:px-6 py-3 pl-16 lg:pl-6 relative">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 absolute left-1/2 -translate-x-1/2">
        <span className="hidden sm:inline">Lichtman's Liquor Store</span>
        <span className="sm:hidden">Lichtman's</span>
      </h1>
      <button
        onClick={handleLogout}
        className="bg-rose-800 text-white px-3 sm:px-4 py-2 rounded hover:bg-rose-900 transition-colors flex items-center gap-2 text-sm sm:text-base flex-shrink-0 ml-auto cursor-pointer"
      >
        <FiLogOut size={18}/>
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default Header;
