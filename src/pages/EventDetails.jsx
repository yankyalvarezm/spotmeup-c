import React, { useEffect, useState } from "react";
import NavBar from "../components/ToolsC/NavBar";
import { findEvent } from "../services/events.service";
import { useParams, useNavigate } from "react-router-dom";
import DynamicLayout from "../components/ToolsC/DynamicLayout";

const EventDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  const getThisEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        setEvent(response.event);
      }
      console.log("GetThisEvent - Response:", response);
    } catch (error) {
      console.error("GetThisEvent - Error:", error.response);
    }
  };

  const [acceppted, setAcceppted] = useState(false);

  const handleAccept = async () => {
    setAcceppted((prev) => !prev);
  };

  const [message, setMessage] = useState(null);

  const moveToDetails = async (eventId) => {
    if (acceppted) {
      navigate(`/event-tickets/${eventId}`);
    } else {
      setMessage("Term & Conditions Must Be Accepted");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  console.log("Accepted:", acceppted);

  useEffect(() => {
    getThisEvent();
  }, [param.eventIdParam]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const eventDate = new Date(dateString);
    if (isNaN(eventDate)) return ""; // Verificación adicional para evitar fechas inválidas

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
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  if (!event) {
    return <div>Loading...</div>; // O algún indicador de carga
  }

  return (
    <div className="event-details-container">
      <NavBar />

      <div className="event-details-grid">
        <div
          style={{
            backgroundImage: `url(${
              event.images && event.images.length > 0
                ? event.images[0]
                : "/no-image.jpg" // URL de la imagen de respaldo
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // width: "900px",
            // height: "1000px",
          }}
          className="event-image-details"
        ></div>

        <div className="event-details-fields">
          <div className="event-details-separator">
            <div>
              <h1 className="event-details-title">{event.name}</h1>
              <div className="event-details-container-two">
                <div className="event-details-group">
                  <svg
                    width="13"
                    height="18"
                    viewBox="0 0 13 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.5 16.54L7.131 15.829C7.847 15.009 8.491 14.231 9.064 13.491L9.537 12.867C11.512 10.206 12.5 8.094 12.5 6.533C12.5 3.201 9.814 0.5 6.5 0.5C3.186 0.5 0.5 3.201 0.5 6.533C0.5 8.094 1.488 10.206 3.463 12.867L3.936 13.491C4.75344 14.5384 5.60867 15.5547 6.5 16.54Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h1 className="normalize-font">
                    {event.address.city} - {event.address.state}
                  </h1>
                </div>

                <div className="event-details-group">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_341_4165)">
                      <path
                        d="M14.5 16.5H1.5C0.67 16.5 0 15.83 0 15V3C0 2.17 0.67 1.5 1.5 1.5H14.5C15.33 1.5 16 2.17 16 3V15C16 15.83 15.33 16.5 14.5 16.5ZM1.5 2.5C1.22 2.5 1 2.72 1 3V15C1 15.28 1.22 15.5 1.5 15.5H14.5C14.78 15.5 15 15.28 15 15V3C15 2.72 14.78 2.5 14.5 2.5H1.5Z"
                        fill="black"
                      />
                      <path
                        d="M4.5 4.5C4.22 4.5 4 4.28 4 4V1C4 0.72 4.22 0.5 4.5 0.5C4.78 0.5 5 0.72 5 1V4C5 4.28 4.78 4.5 4.5 4.5ZM11.5 4.5C11.22 4.5 11 4.28 11 4V1C11 0.72 11.22 0.5 11.5 0.5C11.78 0.5 12 0.72 12 1V4C12 4.28 11.78 4.5 11.5 4.5ZM15.5 6.5H0.5C0.22 6.5 0 6.28 0 6C0 5.72 0.22 5.5 0.5 5.5H15.5C15.78 5.5 16 5.72 16 6C16 6.28 15.78 6.5 15.5 6.5Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_341_4165">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <h1 className="normalize-font">{formatDate(event.date)}</h1>
                </div>
                <div className="event-details-group">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5Z"
                      stroke="black"
                    />
                    <path
                      d="M16.5 12H12.25C12.1837 12 12.1201 11.9737 12.0732 11.9268C12.0263 11.8799 12 11.8163 12 11.75V8.5"
                      stroke="black"
                      stroke-linecap="round"
                    />
                  </svg>
                  <h1 className="normalize-font">{formatTime(event.time)}</h1>
                </div>
                <h1 className="normalize-font">{event?.description}</h1>
              </div>
            </div>
            <div className="event-details-btn-container"></div>
            {message && <h1 className="event-li-terms-red">{message}</h1>}
            {isMobile && (
              <button
                className="event-details-btn"
                onClick={() => moveToDetails(event._id)}
              >
                Buy Tickets
              </button>
            )}
            {!isMobile && (
              <button
                className="event-details-btn"
                onClick={() => moveToDetails(event._id)}
              >
                Buy Tickets
              </button>
            )}
          </div>
          <hr className="term-conditions-hr" />
          <div className="event-terms-conditions-container">
            <h1 className="event-li-title">Política De Reembolso</h1>
            <ul>
              <li className="event-li-terms">
                Los reembolsos estarán disponibles únicamente si el promotor
                cancela el evento debido a causas mayores.
              </li>
              <li className="event-li-terms">
                No se otorgarán reembolsos por cargos de servicio.
              </li>
              <li className="event-li-terms">
                Para solicitar un reembolso en caso de cancelación por causas
                mayores, envíe un correo electrónico a soporte@spotmeup.com con
                el ID de la orden y los detalles del evento.
              </li>
            </ul>
            <h1 className="event-li-title">Política De Devoluciones</h1>
            <ul>
              <li className="event-li-terms">
                Las devoluciones se realizarán automáticamente dentro de los 5
                días laborables una vez se haya determinado que la actividad
                tiene un motivo válido para cancelar.
              </li>
              <li className="event-li-terms">
                En caso de cancelación del evento por un motivo válido, los
                tickets serán reembolsados automáticamente al método de pago
                original.
              </li>
              <li className="event-li-terms">
                Si un evento es reprogramado, los tickets serán válidos para la
                nueva fecha. Si no puede asistir a la nueva fecha, puede
                solicitar un reembolso dentro de los 14 días posteriores al
                anuncio de la reprogramación.
              </li>
            </ul>
            <h1 className="event-li-title">Política de Cancelación</h1>
            <ul>
              <li className="event-li-terms">
                Una vez comprado el ticket, el usuario no puede cancelar su
                compra.
              </li>
              <li className="event-li-terms">
                Si el promotor cancela el evento por una razón válida, se le
                reembolsará el dinero dentro de 5 días laborables.
              </li>
              <li className="event-li-terms">
                Para más información o asistencia, contacte a nuestro equipo de
                soporte en soporte@spotmeup.com.
              </li>
            </ul>
            <label htmlFor="checkbox" className="event-li-terms">
              Acepto Los Terminos & Condiciones
            </label>
            <input type="checkbox" name="check" onClick={handleAccept} />
          </div>
        </div>
      </div>
      <h1 className="event-details-preview">Preview</h1>
      <div className="event-details-layout">
        <DynamicLayout layoutId={event?.layout?._id} scale={0.5} edit={false} />
      </div>
    </div>
  );
};

export default EventDetails;
