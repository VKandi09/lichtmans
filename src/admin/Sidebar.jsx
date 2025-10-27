const Sidebar = ({ activePage, setActivePage }) => {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "view-products", label: "View All Products" },
    { key: "add-product", label: "Add New Product" },
    // { key: "update-contact", label: "Update Contact Details" },
    { key: "view-events", label: "View Events" },
    { key: "add-event", label: "Add New Event" },
  ];

  return (
    <aside className="w-64 bg-rose-900 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Store Admin</h2>
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActivePage(item.key)}
          className={`text-left px-4 py-2 rounded mb-2 transition-colors duration-300 ${
            activePage === item.key ? "bg-rose-800" : "hover:bg-rose-700"
          }`}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
