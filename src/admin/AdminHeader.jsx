const Header = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
    }
  };

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-bold text-gray-800">Lichtman's Liquor Store</h1>
      <button
        onClick={handleLogout}
        className="bg-rose-800 text-white px-4 py-2 rounded hover:bg-rose-900 cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
