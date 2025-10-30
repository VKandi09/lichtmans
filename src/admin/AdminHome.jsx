import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminProductList from "./AdminProductList";
import AddProduct from "./AddProduct";
import AdminEventList from "./AdminEventList";
import AddEvent from "./AddEvent";
import AddOffer from "./AddOffer";
import OffersList from "./OffersList";

const AdminHome = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <AdminLayout activePage={activePage} setActivePage={setActivePage}>
      {activePage === "dashboard" && <AdminDashboard />}
      {activePage === "view-products" && <AdminProductList />}
      {activePage === "add-product" && <AddProduct />}
      {activePage === "update-contact" && <div>Update Contact Details Coming Soon</div>}
      {activePage === "update-events" && <div>Update Events Coming Soon</div>}
      {activePage === "view-events" && <AdminEventList />}
      {activePage === "add-event" && <AddEvent />}
      {activePage === "view-offers" && <OffersList />}
      {activePage === "add-offer" && <AddOffer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </AdminLayout>
  );
};

export default AdminHome;
