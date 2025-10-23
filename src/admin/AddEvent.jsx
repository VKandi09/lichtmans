import { useState } from "react";

const BASE_URL = "http://localhost:5001/api/events";

const AddEvent = ({ refresh }) => {
  const [form, setForm] = useState({
    title: "",
    sponsors: "",
    date: "",
    time: "",
    location: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      sponsors: form.sponsors.split(",").map((s) => s.trim()),
    };

    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Event added successfully!");
    setForm({
      title: "",
      sponsors: "",
      date: "",
      time: "",
      location: "",
      details: "",
    });
    refresh && refresh();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Event Title" className="border p-2 w-full rounded" required />
        <input name="sponsors" value={form.sponsors} onChange={handleChange} placeholder="Sponsors (comma separated)" className="border p-2 w-full rounded" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 w-full rounded" required />
        <input name="time" value={form.time} onChange={handleChange} placeholder="Time" className="border p-2 w-full rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full rounded" />
        <textarea name="details" value={form.details} onChange={handleChange} placeholder="Details" className="border p-2 w-full rounded" />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
