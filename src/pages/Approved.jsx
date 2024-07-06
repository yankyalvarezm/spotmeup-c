import React, { useEffect, useContext, useState } from "react";
import { findEvent } from "../services/events.service";
import { TicketsContext } from "../context/tickets.context";
import { useParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import QrScanner from 'react-qr-scanner';

const Approved = () => {
  const param = useParams();
  const { ticketsCart } = useContext(TicketsContext);
  const [event, setEvent] = useState();
  const [scanResult, setScanResult] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  console.log("🚀 ~ Approved ~ ticketsCart:", ticketsCart);

  const getTheEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        setEvent(response.event);
      }
      console.log("GetTheEvent - Success:", response.event);
    } catch (error) {
      console.error("GetTheEvent - Error:", error.response);
    }
  };

  useEffect(() => {
    getTheEvent();
  }, [param.eventIdParam]);

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
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  console.log("Amount Value:", formatNumberWithCommas(amountValue));
  console.log("Response Message:", response);
  console.log("tixAmount:", param.tixAmount);

  return (
    <div>
      <h1 className="approved-page">Approved Page - Summary</h1>
      <div className="approved-summary">
        <div className="summary-event-container">
          <h1 className="bold">{event?.name}</h1>
          <h1>{event?.address?.street}</h1>
          <h1>{formatTime(event?.time)}</h1>
        </div>

        <QRCode value="Alexander Puñetaaaa" />

        <div className="approved-description">
          <h1>Tickets:</h1>
          <h1>{param.tixAmount}</h1>
        </div>
        <div className="approved-description">
          <h1>Pagaste:</h1>
          <h1>$RD {formatNumberWithCommas(amountValue)}</h1>
        </div>

        <div className="qr-reader-container">
          <h1>Escanear QR</h1>
          <button onClick={() => setCameraActive(!cameraActive)}>
            {cameraActive ? "Apagar Cámara" : "Prender Cámara"}
          </button>
          {cameraActive && (
            <QrScanner
              delay={300}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          )}
          {scanResult && (
            <div>
              <h2>Resultado del Escaneo:</h2>
              <p>{scanResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Approved;
