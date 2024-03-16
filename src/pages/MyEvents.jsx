import React, { useContext, useEffect, useState } from "react";
import SubNavbar from "../components/MyEvents/SubNavbar";
import NavBar from "../components/ToolsC/NavBar";
import AddNewVenue from "../components/MyEvents/AddNewVenue";
import SearchVenues from "../components/MyEvents/SearchVenues";
import { MyEventsContext } from "../context/MyEvents.context";
import SearchEvents from "../components/MyEvents/SearchEvents";
import AddNewEvent from "../components/MyEvents/AddNewEvent";
import VenueForm from "../components/Venues/VenueForm";
import BackVenueSearch from "../components/Venues/BackVenueSearch";
import DisplayVenues from "../components/Venues/DisplayVenues";
import { Form, FloatingLabel } from "react-bootstrap";
import Draggable from "react-draggable";

const MyEvents = () => {
  const { showEvents, showVenues, showVenuesForm } =
    useContext(MyEventsContext);

  const [column, setColumn] = useState(3);
  const [rows, setRows] = useState(3);
  const [position, setPosition] = useState({ x: 145, y: 0 });
  const [position2, setPosition2] = useState({ x: 300, y: 150 });
  const [position3, setPosition3] = useState({ x: 150, y: 300 });
  const [position4, setPosition4] = useState({ x: 0, y: 150 });
  const [leftValue, setLeftValue] = useState(300);
  const [rightValue, setRightValue] = useState(0);
  const [bottomValue, setBottomValue] = useState(300);

  const defaultPosition = { x: 0, y: 0 };

  // console.log("position:", position);
  console.log("position4:", position4);
  // console.log("leftValue:", leftValue);

  const onDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const onDragStop2 = (e, data) => {
    setPosition2({ x: data.x, y: data.y });

    const arriba = data.x - -300;
    const abajo = 300 - -300;

    const valorNormalizado = arriba / abajo;

    // valorNormalizado.pareInt();

    let newValue = valorNormalizado * 300;

    console.log("valorNormalizado:", valorNormalizado);
    console.log("newValue:", newValue);

    setLeftValue(newValue);
  };

  const onDragStop3 = (e, data) => {
    setPosition3({ x: data.x, y: data.y });

    const arriba = data.y - -300;
    const abajo = 300 - -300;

    const valorNormalizado = arriba / abajo;

    let newValue = valorNormalizado * 300;

    console.log("valorNormalizado:", valorNormalizado);
    console.log("newValue:", newValue);

    setBottomValue(newValue);
  };

  const onDragStop4 = (e, data) => {
    setPosition4({ x: data.x, y: data.y });

    const arriba = data.x;
    const abajo = 600;

    const valorNormalizado = arriba / abajo;

    // valorNormalizado.pareInt();

    let newValue = valorNormalizado * 300;

    console.log("valorNormalizado:", valorNormalizado);
    console.log("newValue:", newValue);

    setRightValue(newValue);
  };

  useEffect(() => {
    let remove = document.querySelectorAll(".dot-drag");

    for (let r of remove) {
      r.style.removeProperty("transform");
    }
  }, [position, position2, position3, position4]);

  return (
    <div className="myevents-container">
      <div>
        <NavBar />
      </div>
      <div className="myeventstab-container">
        <SubNavbar />
        {showVenues && !showVenuesForm && (
          <div>
            <div className="search-add-venues">
              <SearchVenues />
              <h1 className="or">or</h1>
              <AddNewVenue />
            </div>

            <DisplayVenues />
          </div>
        )}
        {showVenuesForm && !showEvents && <BackVenueSearch />}
        {showVenuesForm && !showEvents && <VenueForm />}

        {showEvents && (
          <div>
            <div className="search-add-venues">
              <SearchEvents />
              <h1 className="or">or</h1>
              <AddNewEvent />
            </div>

            <div
              className="red-container"
              style={{
                width: "300px",
                height: "300px",
                marginTop: "20rem",
                marginLeft: "10rem",
                alignItems: "center",
                backgroundColor: "red",
                clipPath: `path("M 0 0 Q ${position.x} ${position.y} 300 0  Q ${position2.x} ${position2.y} 300 300 Q ${position3.x} ${position3.y} 0 300  Q ${position4.x} ${position4.y} 0 0 Z")`,
                position: "relative",
                // borderRadius: "10px",
              }}
            >
              <Draggable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 300 - 20,
                  bottom: 580,
                }}
                handle=".dot-drag"
                defaultPosition={{ x: position.x, y: position.y / 2 }}
                onDrag={(e, position) => onDragStop(e, position)}
              >
                <div
                  className="dot-drag"
                  style={{
                    position: "absolute",
                    backgroundColor: "greenyellow",
                    width: "20px",
                    height: "20px",
                    top: `calc(${position.y}px / 2)`,
                    left: position.x,
                    cursor: "grab",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  1
                </div>
              </Draggable>

              <Draggable
                bounds={{
                  left: -300,
                  top: 0,
                  right: 300,
                  bottom: 280,
                }}
                handle=".dot-drag"
                defaultPosition={{ x: leftValue - 20, y: position2.y }}
                onDrag={(e, position2) => onDragStop2(e, position2)}
                onStart={(e) => e.stopPropagation()}
              >
                <div
                  className="dot-drag"
                  style={{
                    position: "absolute",
                    backgroundColor: "greenyellow",
                    width: "20px",
                    height: "20px",
                    top: position2.y,
                    left: leftValue - 20,
                    cursor: "grab",
                    borderRadius: "50%",
                  }}
                >
                  2
                </div>
              </Draggable>

              <Draggable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 280,
                  bottom: 300,
                }}
                handle=".dot-drag"
                defaultPosition={{ x: position3.x, y: bottomValue - 20 }}
                onDrag={(e, position3) => onDragStop3(e, position3)}
              >
                <div
                  className="dot-drag"
                  style={{
                    position: "absolute",
                    backgroundColor: "greenyellow",
                    width: "20px",
                    height: "20px",
                    top: bottomValue - 20,
                    left: position3.x,
                    cursor: "grab",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  3
                </div>
              </Draggable>

              <Draggable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 600,
                  bottom: 300,
                }}
                handle=".dot-drag"
                defaultPosition={{ x: position4.x, y: rightValue }}
                onDrag={(e, position4) => onDragStop4(e, position4)}
              >
                <div
                  className="dot-drag"
                  style={{
                    position: "absolute",
                    backgroundColor: "greenyellow",
                    width: "20px",
                    height: "20px",
                    top: position4.y,
                    left: rightValue,
                    cursor: "grab",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  4
                </div>
              </Draggable>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
