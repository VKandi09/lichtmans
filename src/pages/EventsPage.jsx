import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const initialEvents = [
  { date: new Date(2025, 9, 5), title: "Wine Tasting Event", time: "6:00 PM", location: "Store 1", details: "Come taste new wines!" },
  { date: new Date(2025, 9, 10), title: "Whiskey Workshop", time: "5:00 PM", location: "Store 2", details: "Learn whiskey making." },
];

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState(initialEvents);

  const eventsForDate = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 flex flex-col md:flex-row gap-6">
      {/* Calendar Column */}
      <div className="md:w-1/3">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="border rounded-lg"
          tileContent={({ date }) => {
            const hasEvent = events.some(
              (event) => event.date.toDateString() === date.toDateString()
            );
            return hasEvent ? (
              <div className="mt-1 w-2 h-2 bg-red-800 rounded-full mx-auto" />
            ) : null;
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
            <div key={index} className="border p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.time} | {event.location}</p>
              <p className="mt-2">{event.details}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
