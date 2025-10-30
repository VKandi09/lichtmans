import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE } from "../api";

const BASE_URL = `${API_BASE}/api/offers`;

const AddOffer = ({ refresh }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    badge: "",
    validUntil: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to add offer");
      }

      toast.success("🎉 Offer added successfully!");
      setForm({
        title: "",
        description: "",
        image: "",
        badge: "",
        validUntil: "",
      });
      refresh && refresh();
    } catch (err) {
      toast.error("❌ Error adding offer");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Add New Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Offer Title"
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
          rows="3"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL (e.g. /images/offer1.jpg)"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="badge"
          value={form.badge}
          onChange={handleChange}
          placeholder="Badge (e.g. Hot Deal, New, Limited Time)"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="validUntil"
          value={form.validUntil}
          onChange={handleChange}
          placeholder="Valid Until (e.g. mm/dd/yyyy)"
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add Offer
        </button>
      </form>
    </div>
  );
};

export default AddOffer;
