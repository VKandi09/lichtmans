import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5001/api/products";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    brand: "",
    special: false,
    price: "",
    quantity: "",
    stock: "",
    image: "",
    subType: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  // Save product changes
  const handleSave = async () => {
    if (!window.confirm("Save changes to this product?")) return;

    const updated = {
      ...editingProduct,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      quantity: Number(editingProduct.quantity),
    };

    await fetch(`${BASE_URL}/${editingProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setEditingProduct(null);
    fetchProducts();
    showToast("Product updated successfully!");
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    fetchProducts();
    setEditingProduct(null);
    showToast("Product deleted successfully!");
  };

  // Add new product
  const handleAddProduct = async () => {
    const formatted = {
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      quantity: Number(newProduct.quantity),
    };

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatted),
    });

    const data = await res.json();
    setProducts([...products, data]);
    showToast("Product added successfully!");

    setNewProduct({
      name: "",
      type: "",
      brand: "",
      special: false,
      price: "",
      quantity: "",
      stock: "",
      image: "",
      subType: "",
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logout
  const handleLogout = () => {
    if (window.confirm("Logout from admin?")) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-900 text-white flex flex-col">
        <h1 className="text-2xl font-bold text-center py-6 border-b border-gray-700">
          Lichtmans Liquor
        </h1>
        <nav className="flex-1 p-4 space-y-3">
          {["dashboard", "view", "add", "contact", "events"].map((tab) => (
            <button
              key={tab}
              className={`block w-full text-left py-2 px-3 rounded transition ${
                activeTab === tab ? "bg-red-700" : "hover:bg-red-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "dashboard" && "Dashboard"}
              {tab === "view" && "View All Products"}
              {tab === "add" && "Add New Product"}
              {tab === "contact" && "Update Contact Details"}
              {tab === "events" && "Update Events"}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="bg-black py-3 text-center hover:bg-gray-800"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 relative">
        {toast && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow">
            {toast}
          </div>
        )}

        {activeTab === "dashboard" && (
          <h2 className="text-3xl font-semibold mb-6">Welcome to Admin Dashboard</h2>
        )}

        {activeTab === "view" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search product..."
                className="border border-gray-300 p-2 rounded w-1/3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="w-full border border-gray-300 bg-white shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="text-center hover:bg-gray-50">
                    <td className="border p-2">{p.name}</td>
                    <td className="border p-2">${p.price}</td>
                    <td className="border p-2">{p.quantity}</td>
                    <td className="border p-2">{p.stock}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "add" && (
          <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(newProduct).map((key) => (
                <div key={key}>
                  {key !== "special" ? (
                    <input
                      type={
                        key === "price" || key === "stock" || key === "quantity"
                          ? "number"
                          : "text"
                      }
                      placeholder={key}
                      value={newProduct[key]}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, [key]: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newProduct.special}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            special: e.target.checked,
                          })
                        }
                      />
                      Special
                    </label>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-green-700"
            >
              Add Product
            </button>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            {Object.keys(editingProduct).map((key) => {
              if (["_id", "updatedAt", "__v"].includes(key)) return null;
              if (key !== "special") {
                return (
                  <input
                    key={key}
                    type={
                      key === "price" || key === "stock" || key === "quantity"
                        ? "number"
                        : "text"
                    }
                    name={key}
                    value={editingProduct[key]}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        [key]: e.target.value,
                      })
                    }
                    placeholder={key}
                    className="border w-full mb-3 p-2 rounded"
                  />
                );
              } else {
                return (
                  <label key={key} className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      name={key}
                      checked={editingProduct[key]}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          [key]: e.target.checked,
                        })
                      }
                    />
                    Special
                  </label>
                );
              }
            })}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDelete(editingProduct._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
