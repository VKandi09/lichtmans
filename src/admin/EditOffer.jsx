import { useState } from "react";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import { API_BASE } from '../api';

const BASE_URL = `${API_BASE}/api/offers`;

const EditOffer = ({ offer, onClose, refresh }) => {
  const [form, setForm] = useState({
    title: offer.title,
    description: offer.description,
    image: offer.image,
    badge: offer.badge,
    validUntil: offer.validUntil,
  });

  const [confirmAction, setConfirmAction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => setConfirmAction("save");
  const handleDelete = () => setConfirmAction("delete");

  const confirmActionHandler = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction === "save") {
        const payload = {
          ...form,
        };

        await fetch(`${BASE_URL}/${offer._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Offer updated successfully!");
      } else if (confirmAction === "delete") {
        await fetch(`${BASE_URL}/${offer._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Offer deleted successfully!");
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
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Edit Modal */}
      <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-800 p-1"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold mb-4 pr-8 text-rose-800">Edit Event</h2>

        <form className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          />
          <input
            type="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          />
          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Badge"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          />
          <input
            name="validUntil"
            value={form.validUntil}
            onChange={handleChange}
            placeholder="Valid Until"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          />
        </form>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm sm:text-base order-3 sm:order-1"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm sm:text-base order-1 sm:order-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors text-sm sm:text-base order-2 sm:order-3"
          >
            Cancel
          </button>
        </div>

        {/* Confirmation Modal */}
        {confirmAction && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md z-10">
              <p className="mb-4 text-gray-700 text-sm sm:text-base">
                {confirmAction === "save"
                  ? "Do you want to save changes?"
                  : "Are you sure you want to delete this offer?"}
              </p>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmActionHandler}
                  className={`px-4 py-2 text-white rounded transition-colors text-sm sm:text-base ${
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

export default EditOffer;
