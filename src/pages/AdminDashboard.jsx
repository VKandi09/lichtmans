
const AdminDashboard = () => {
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin"; // Redirect to admin login page
        }
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>Admin Dashboard
    <button
        onClick={handleLogout}
        className="bg-red-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-500 ease-in-out hover:bg-red-900 hover:scale-105 hover:shadow-md mt-6 focus-within:border-transparent"
      >
        Logout
      </button>
    </div>
    
  )
}

export default AdminDashboard