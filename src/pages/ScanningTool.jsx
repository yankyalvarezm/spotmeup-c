import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findEvent } from "../services/events.service";
import QrScanner from "react-qr-scanner";

const ScanningTool = () => {
  const param = useParams();
  const [event, setEvent] = useState(null);
  const [scanResult, setScanResult] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleFindEvent = async () => {
    try {
      const response = await findEvent(param.eventIdParam);
      if (response.success) {
        console.log("Find Event - Success:", response.event);
        setEvent(response.event);
      }
    } catch (error) {
      console.log("Find Event - Error:", error.response);
    }
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

  const handleCameraToggle = () => {
    setCameraActive((prev) => !prev);

    if (!cameraActive) {
      const id = setTimeout(() => {
        setCameraActive(false);
        setScanResult(null);
      }, 20000); 

      setTimeoutId(id);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  setTimeout(() => {
    if (scanResult) {
      setScanResult(null);
    }
  }, 5000);

  useEffect(() => {
    handleFindEvent();
  }, [param.eventIdParam]);

  const videoConstraints = {
    facingMode: "environment",
  };

  return (
    <div className="scanning-tool-page">
      {event && (
        <div className="scanning-tool-container">
          <h1 className="scanning-page-title">{event.name}</h1>
          {cameraActive ? (
            <div className="video-camera-container">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                constraints={{ video: videoConstraints }}
                className={`qr-scanner-camera ${
                  cameraActive ? "" : "qr-scanner-camera-hidden"
                }`}
              />

              <button
                onClick={handleCameraToggle}
                className={`scan-button-finished ${
                  cameraActive ? "" : "scan-button-finished-hidden"
                }`}
              >
                Finish
              </button>
            </div>
          ) : (
            <button
              onClick={handleCameraToggle}
              className={`scan-button ${
                cameraActive ? "scan-button-hidden" : ""
              }`}
            >
              Click To Scan
            </button>
          )}
        </div>
      )}
      {scanResult && (
        <div className="scan-resul-container">
          <h2 className="scan-result-key">Scan Result</h2>
          <p className="scan-result-value">{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default ScanningTool;
