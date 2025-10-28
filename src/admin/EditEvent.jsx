import { useState } from "react";
import { API_BASE } from '../api';

const BASE_URL = `${API_BASE}/api/events`;

const EditEvent = ({ event, onClose, refresh }) => {
  const [form, setForm] = useState({
    title: event.title,
    sponsors: event.sponsors,      //event.sponsors.join(", "),
    date: event.date.split("T")[0],
    time: event.time || "",
    location: event.location || "",
    details: event.details || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      sponsors: form.sponsors.split(",").map((s) => s.trim()),
    };

    await fetch(`${BASE_URL}/${event._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Event updated successfully!");
    onClose();
    refresh();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} className="border p-2 w-full rounded"/>
          <input name="sponsors" value={form.sponsors} onChange={handleChange} className="border p-2 w-full rounded" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="time" value={form.time} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="location" value={form.location} onChange={handleChange} className="border p-2 w-full rounded" />
          <textarea name="details" value={form.details} onChange={handleChange} className="border p-2 w-full rounded" />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
