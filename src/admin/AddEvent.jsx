import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE } from "../api";

const BASE_URL = `${API_BASE}/api/events`;

const AddEvent = ({ refresh }) => {
  const [form, setForm] = useState({
    title: "",
    sponsors: "",
    date: "",
    time: "",
    location: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent empty field submission
    if (!form.title || !form.sponsors || !form.date) {
      toast.warning("Please fill all required fields!");
      return;
    }

    const payload = {
      ...form,
      sponsors: form.sponsors.split(",").map((s) => s.trim()),
    };

    try {
      setLoading(true);
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add event");

      toast.success("Event added successfully!");

      // Reset form after successful submission
      setForm({
        title: "",
        sponsors: "",
        date: "",
        time: "",
        location: "",
        details: "",
      });

      refresh && refresh();
    } catch (error) {
      toast.error(error.message || "Error adding event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow w-full max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          required
        />
        <input
          name="sponsors"
          value={form.sponsors}
          onChange={handleChange}
          placeholder="Sponsors (comma separated)"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
          required
        />
        <input
          name="time"
          value={form.time}
          onChange={handleChange}
          placeholder="Time"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
        />
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Details"
          className="border p-2 w-full rounded focus:ring-2 focus:ring-rose-800 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
