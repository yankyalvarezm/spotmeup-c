import React from "react";

const UpcomingEvents = ({ events }) => {
  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const differenceInTime =
      eventDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0); // Ignore time part
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) {
      return "Hoy";
    } else if (differenceInDays === 1) {
      return "Mañana";
    } else if (differenceInDays > 1 && differenceInDays < 7) {
      return `Este ${eventDate.toLocaleString("es-ES", { weekday: "long" })}`;
    } else {
      return new Intl.DateTimeFormat("es-ES", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(eventDate);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };
  const filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  });


  return (
    <div className="upcoming-events-container">
      {filteredEvents && filteredEvents?.length > 0 ? (
        filteredEvents
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((event) => (
            <div key={event._id} className="upcoming-event-item">
              <div
                style={{
                  backgroundImage: `url(${
                    event.images && event.images.length > 0
                      ? event.images[0]
                      : "/no-image.jpg" // URL de la imagen de respaldo
                  })`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: "85px",
                  height: "100px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
                className="event-image"
              ></div>
              <div className="upcoming-event-fields">
                <h1 className="">{event?.name}</h1>
                <h1 className="">
                  {event?.address?.state}, {event?.address?.city}
                </h1>

                <h1 className="">{formatDate(event?.date)}</h1>
                <h1 className="">{formatTime(event?.time)}</h1>
              </div>
            </div>
          ))
      ) : (
        <p>No upcoming events</p>
      )}
    </div>
  );
};

export default UpcomingEvents;
