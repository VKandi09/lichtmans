import Sidebar from "./Sidebar";
import Header from "./AdminHeader";

const AdminLayout = ({ activePage, setActivePage, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
