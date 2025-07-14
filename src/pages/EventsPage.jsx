import { useEffect, useState } from "react";
import { FaRegStar, FaShareAlt, FaStar } from "react-icons/fa";
import Header from "../components/Header"

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events/");
      const data = await res.json();

      const updatedEvents = data.map((event) => {
        if (event) {
          const imgPath = "../assets/images/";
          const imgSrc = new URL(`${imgPath}${event.image}`, import.meta.url)
            .href;
          return {
            ...event,
            imgSrc,
          };
        }
      });
      console.log(updatedEvents);
      setEvents(updatedEvents);
    } catch (e) {
      console.log(e);
    } finally {
      null;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleInterest = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, interested: !event.interested } : event
      )
    );
  };

  const handleRegister = (event) => {
    alert(`Registered for ${event.title}`);
  };
  const handleShare = async (event) => {
    try {
      await navigator.clipboard.writeText(
        `https://zeal.com/events/${event.id}`
      );
      alert(`Event link copied: /events/${event.id}`);
    } catch (error) {
      console.error("Error copying link:", error);
      alert("Failed to copy link. Please try again.");
    }
  };

  return (
    <>
    <Header heading={"Upcoming Events"} expo={"Register to our upcoming events"}/>
      <div className="bg-pink-50 min-h-screen py-12 px-6">
        {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Upcoming Events
        </h1> */}
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="max-w-[500px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={event.imgSrc}
                alt={event.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {event.date} • {event.location}
                </p>

                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => handleRegister(event)}
                    className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700 transition"
                  >
                    Register
                  </button>

                  <button
                    onClick={() => toggleInterest(event.id)}
                    className="flex items-center text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                  >
                    {event.interested ? (
                      <FaStar className="text-yellow-400 mr-2" />
                    ) : (
                      <FaRegStar className="mr-2" />
                    )}
                    {event.interested ? "Interested" : "Mark Interest"}
                  </button>

                  <button
                    onClick={() => handleShare(event)}
                    className="flex items-center text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                  >
                    <FaShareAlt className="mr-2" /> Share
                  </button>
                </div>

                {event.interested && (
                  <p className="text-xs text-pink-600">
                    You marked this event as interesting
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
