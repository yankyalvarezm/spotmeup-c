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
  const [position2, setPosition2] = useState({ x: 220, y: 121 });
  const [position3, setPosition3] = useState({ x: 0, y: 0 });
  const [position4, setPosition4] = useState({ x: 0, y: 0 });

  const defaultPosition = { x: 0, y: 0 };

  // console.log("position:", position);
  console.log("position2:", position2);

  const onDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const onDragStop2 = (e, data) => {
    setPosition2({ x: data.x, y: data.y });
  };

  const onDragStop3 = (e, data) => {
    setPosition3({ x: data.x, y: data.y });
  };

  const onDragStop4 = (e, data) => {
    setPosition4({ x: data.x, y: data.y });
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
                width: `"300px"`,
                height: "300px",
                marginTop: "20rem",
                marginLeft: "10rem",
                alignItems: "center",
                backgroundColor: "red",
                clipPath: `path("M 0 0 Q ${position.x} ${position.y} 300 0  Q ${position2.x} ${position2.y} 300 300 Q 150 150 0 300  Q 150 100 0 0 Z")`,
                position: "relative",
                // borderRadius: "10px",
              }}
            >
              <Draggable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 300 - 20,
                  bottom: 280,
                }}
                handle=".dot-drag"
                defaultPosition={defaultPosition}
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
                  left: 0,
                  top: 0,
                  right: 300,
                  bottom: 280,
                }}
                handle=".dot-drag"
                defaultPosition={defaultPosition}
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
                    left: position2.x - 20,
                    // left: `calc((${position2.x} / 2)+ 30)`,
                    // left: calc(50% + (position2.x - 150) * factor);
                    // left: 200,
                    // left: `${position2.x + (230 - 30)}px`,
                    // right: `calc(300px - ${position2.x}px - 20px)`,
                    // left: "240px",
                    cursor: "grab",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  2
                </div>
              </Draggable>

              {/* <Draggable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 280 - 20,
                  bottom: 280,
                }}
                handle=".dot-drag"
                defaultPosition={defaultPosition}
                onDrag={(e, position3) => onDragStop3(e, position3)}
              >
                <div
                  className="dot-drag"
                  style={{
                    position: "absolute",
                    backgroundColor: "greenyellow",
                    width: "20px",
                    height: "20px",
                    top: position3.y,
                    left: position3.x,
                    cursor: "grab",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  3
                </div>
              </Draggable> */}

              {/* <Draggable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 280 - 20,
                  bottom: 280,
                }}
                handle=".dot-drag"
                defaultPosition={defaultPosition}
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
                    left: position4.x,
                    cursor: "grab",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  4
                </div>
              </Draggable> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
