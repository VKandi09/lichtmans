import { useState, useEffect } from "react";
import EditEvent from "./EditEvent";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { API_BASE } from '../api';

const BASE_URL = `${API_BASE}/api/events`;

const AdminEventList = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    fetchEvents();
    alert("Event deleted successfully!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Upcoming Events</h2>
      <table className="w-full border bg-white shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="text-center">
              <td className="border p-2">{event.title}</td>
              <td className="border p-2">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="border p-2">{event.time || "-"}</td>
              <td className="border p-2">{event.location || "-"}</td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingEvent(event)}
                  className="hover:bg-gray-400 px-3 py-1 rounded mr-2"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="hover:bg-gray-400 px-3 py-1 rounded mr-2"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEvent && (
        <EditEvent
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          refresh={fetchEvents}
        />
      )}
    </div>
  );
};

export default AdminEventList;
