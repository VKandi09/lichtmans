import { useState } from "react";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";


const BASE_URL = "http://localhost:5001/api/products";

const EditProduct = ({ product, onClose, refresh }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => setConfirmAction("save");
  const handleDelete = () => setConfirmAction("delete");

  const confirmActionHandler = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction === "save") {
        await fetch(`${BASE_URL}/${product._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        });
        toast.success("Product updated successfully!");
      } else if (confirmAction === "delete") {
        await fetch(`${BASE_URL}/${product._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Product deleted successfully!");
      }

      refresh();
      onClose();
    } catch (error) {
      toast.error(error.message || "Operation failed.");
    } finally {
      setConfirmAction(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <div className="space-y-3">
          {Object.keys(product).map((key) => {
            if (["_id", "__v"].includes(key)) return null;
            if (key !== "special") {
              return (
                <div key={key} className="flex items-center gap-2">
                  <label className="w-28 text-gray-700 font-medium capitalize">
                    {key}
                  </label>
                  <input
                    name={key}
                    type={
                      key === "price" || key === "stock" || key === "quantity"
                        ? "number"
                        : "text"
                    }
                    value={updatedProduct[key] || ""}
                    onChange={handleChange}
                    placeholder={key}
                    className="border w-full p-2 rounded"
                  />
                </div>
              );
            } else {
              return (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={key}
                    checked={updatedProduct[key]}
                    onChange={handleChange}
                  />
                  Special
                </label>
              );
            }
          })}
        </div>
        <div className="flex justify-end gap-4 mt-3">
          <button
            onClick={() => handleDelete()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
        {confirmAction && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 z-10">
              <p className="mb-4 text-gray-700">
                {confirmAction === "save"
                  ? "Do you want to save changes?"
                  : "Are you sure you want to delete this product?"}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmActionHandler}
                  className={`px-4 py-2 text-white rounded ${
                    confirmAction === "save"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
