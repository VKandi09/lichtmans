import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const BASE_URL = "http://localhost:5001/api/events";

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(BASE_URL);
        const data = await res.json();

        // Convert string dates to Date objects
        const formattedEvents = data.map((event) => ({
          ...event,
          date: new Date(event.date),
        }));

        setEvents(formattedEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events for the selected date
  const eventsForDate = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  if (loading) return <p className="text-center mt-24">Loading events...</p>;
  if (error) return <p className="text-center text-red-600 mt-24">{error}</p>;

  return (
    <div className="items-center max-w-6xl mx-auto mt-10 sm:mt-10 p-4 sm:p-6 gap-6 flex flex-col md:flex-row">
      <h1 className="text-3xl font-semibold mb-8 text-rose-800">Upcoming Events</h1>
      {/* Calendar Column */}
      <div className="md:w-1/3">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="border rounded-lg"
          tileClassName={({ date }) => {
            const hasEvent = events.some(
              (event) => event.date.toDateString() === date.toDateString()
            );
            return hasEvent ? 'has-event' : null;
          }}
        />
      </div>

      {/* Event List Column */}
      <div className="md:w-2/3 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">
          Events on {selectedDate.toDateString()}
        </h2>

        {eventsForDate.length === 0 ? (
          <p>No events on this day.</p>
        ) : (
          eventsForDate.map((event, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg">{event.title}</h3>
              <h4 className="text-md">Sponsored by : <span className="font-bold">{event.sponsors}</span></h4>
              <p className="text-sm text-gray-500">
                {event.time} | {event.location}
              </p>
              <p className="mt-2">{event.details}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
