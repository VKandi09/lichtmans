import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5001/api/products"; // Update to your backend port

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
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

  // Fetch existing products
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

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    fetchProducts();
  };

  // Update product
  const handleSave = async () => {
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
  };

  // Handle input changes in edit modal
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  // Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin"; 
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900"
        >
          Logout
        </button>
      </div>

      {/* Add New Product */}
      <div className="mb-6 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                      setNewProduct({ ...newProduct, special: e.target.checked })
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
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.type}</td>
                <td className="border p-2">{p.brand}</td>
                <td className="border p-2">${p.price}</td>
                <td className="border p-2">{p.stock}</td>
                <td className="border p-2 flex justify-center gap-3">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            {Object.keys(editingProduct).map((key) => {
              if (key === "_id" || key === "updatedAt") return null;
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
                    onChange={handleChange}
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
                      onChange={handleChange}
                    />
                    Special
                  </label>
                );
              }
            })}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
