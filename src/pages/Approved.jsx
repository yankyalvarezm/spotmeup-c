import React, { useEffect, useContext, useState } from "react";
import { findEvent } from "../services/events.service";
import { TicketsContext } from "../context/tickets.context";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import QrScanner from "react-qr-scanner";
import { findTransaction } from "../services/transaction.service";
import { createTicket } from "../services/ticket.service";
import { getAllTicketInTransaction } from "../services/ticket.service";
import { sendEmailTickets } from "../services/ticket.service";

const Approved = () => {
  const param = useParams();
  const { ticketsCart } = useContext(TicketsContext);
  const [event, setEvent] = useState();
  const [scanResult, setScanResult] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [ableToGenerate, setAbleToGenerate] = useState(false);
  const [tickets, setTickets] = useState(null);

  //   console.log("🚀 ~ Approved ~ ticketsCart:", ticketsCart);

  //   console.log("eventIdParam:", param.eventIdParam);

  const getTheEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        setEvent(response.event);
      }
      console.log("GetTheEvent - Success:", response);
    } catch (error) {
      console.error("GetTheEvent - Error:", error.response);
    }
  };

  const getTransaction = async () => {
    try {
      const response = await findTransaction(param.transactionIdParam);
      if (response.success) {
        setTransaction(response.transaction);
      }
      console.log("Get Transaction:", response.transaction);
    } catch (error) {
      console.error("response.error.transaction:", error.response);
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

  const searchParams = new URLSearchParams(window.location.search);

  const amountValue = searchParams.get("Amount");

  const response = searchParams.get("ResponseMessage");

  const formatNumberWithCommas = (number) => {
    const integerPart = Math.floor(number / 100).toString();
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setCameraActive(false);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const videoConstraints = {
    facingMode: "environment",
  };

  const findTicketInTransaction = async () => {
    try {
      const response = await getAllTicketInTransaction(
        param.transactionIdParam
      );
      if (response.success) {
        if (response.tickets.length > 0) {
          setTickets(response.tickets);
          setAbleToGenerate(false);
          console.log(
            `There are ${response.tickets.length} tickets already created`
          );
        } else {
          setAbleToGenerate(true);
        }
        console.log("GetAllTicketsInTransaction - Success:", response.tickets);
      }
    } catch (error) {
      console.error("GetAllTicketsInTransaction - Error:", error.response);
    }
  };

  const [emailSuccess, setEmailSuccess] = useState(null);
  const [emailFailed, setEmailFailed] = useState(null);

  const receiveEmail = async () => {
    try {
      const response = await sendEmailTickets(param.transactionIdParam);
      if (response.success) {
        setEmailSuccess("Email Sent Successfully!");
        setTimeout(() => {
          setEmailSuccess(null);
        }, 5000000);
        console.log("Email Sent Successfully");
      }
    } catch (error) {
      setEmailFailed("Could not sent the email");
      setTimeout(() => {
        setEmailFailed(null);
      }, 5000000);
      console.log("Send Email - Failed:", error.response);
    }
  };

  const createTickets = async () => {
    if (!transaction || !event) return;

    try {
      for (const item of transaction.items) {
        for (let i = 0; i < item.tixToGenerate; i++) {
          const ticketObject = {
            name: item.name,
            eventDate: event?.date,
            eventTime: event?.time,
            price: item.price,
            status: "active",
            event: event?._id,
            layout: event?.layout._id,
            block: item.hasTables ? item.blockId : item.id,
            transaction: transaction._id,
            email: transaction.email,
          };

          await createTicket(ticketObject);
          await receiveEmail();
          console.log("Ticket creado:", ticketObject);
        }
      }
      console.log("----------------------------------");
      console.log("All tickets created successfully.");
      await findTicketInTransaction();
    } catch (error) {
      console.error("Error creating tickets:", error);
    }
  };

  //   const ticketObjectJson = JSON.stringify(ticketObject);

  //   console.log("TheEvent:", event);

  const handleCameraToggle = () => {
    setCameraActive((prev) => !prev);

    if (!cameraActive) {
      // Iniciar un temporizador de 30 segundos para apagar la cámara
      const id = setTimeout(() => {
        setCameraActive(false);
      }, 30000); // 30 segundos

      setTimeoutId(id);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  };

  useEffect(() => {
    if (transaction && event) {
      if (ableToGenerate) {
        createTickets();
      }
    }
  }, [transaction, event]);

  useEffect(() => {
    findTicketInTransaction();
    getTheEvent();
    getTransaction();
    setTimeout(() => {
      // receiveEmail();
      getTheEvent();
    }, 2000);
  }, [param.eventIdParam]);

  const handleResendEmail = async () => {
    try {
      const response = await sendEmailTickets();
      if (response.success) {
        setEmailSuccess("Email Sent Successfully!");
        setTimeout(() => {
          setEmailSuccess(null);
        }, 5000);
      }
      console.log("Email Sent Successfully");
    } catch (error) {
      setEmailFailed("Could not sent the email");
      setTimeout(() => {
        setEmailFailed(null);
      }, 5000);
    }
  };

  console.log("tickets:", tickets);

  return (
    <div>
      <h1 className="approved-page">Approved Page - Summary</h1>
      <div className="approved-summary">
        <div className="summary-event-container">
          <h1 className="bold">{event?.name}</h1>
          <h1>{event?.address?.street}</h1>
          <h1>{formatTime(event?.time)}</h1>
        </div>
        <div className={tickets?.length <= 2 ? "qr-code-container-two" : "qr-code-container"}>
          {tickets?.map((ticket, index) => (
            <div>
              <QRCode
                value={ticket?.qrCode}
                key={index}
                className="qr-code-approved"
              />
              <h1 className="ticket-name-qr">{ticket?.name}</h1>
            </div>
          ))}
        </div>

        <div className="approved-description">
          <h1>Items:</h1>
          <h1>{tickets?.length}</h1>
        </div>
        <div className="approved-description">
          <h1>Pagaste:</h1>
          <h1>$RD {formatNumberWithCommas(amountValue)}</h1>
        </div>
      </div>
      {emailSuccess && <h2 className="email-sucess">{emailSuccess}</h2>}
      {emailFailed && (
        <div className="resend-email-failed">
          <h2 className="email-failed">{emailFailed}</h2>
          <button onClick={handleResendEmail}>Resend</button>
        </div>
      )}
    </div>
  );
};

export default Approved;
