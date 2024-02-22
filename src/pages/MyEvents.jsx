import React, { useContext, useState } from "react";
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

const MyEvents = () => {
  const { showEvents, showVenues, showVenuesForm } =
    useContext(MyEventsContext);

  const [column, setColumn] = useState(3);
  const [rows, setRows] = useState(3);

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
          <>
            <div className="search-add-venues">
              <SearchEvents />
              <h1 className="or">or</h1>
              <AddNewEvent />
            </div>
            <label htmlFor="column">column</label>
            <input
              type="number"
              placeholder="column"
              name="column"
              value={column}
              onChange={(e) => setColumn(Number(e.target.value))}
            />
            <label htmlFor="row">row</label>
            <input
              type="number"
              placeholder="row"
              name="row"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />

            <div
              className="grid-example"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${column}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                border: "1px solid black",
                marginRight: "2rem",
                marginLeft: "2rem",
              }}
            >
              <h2>1</h2>
              <h2>2</h2>
              <h2>3</h2>
              <h2>4</h2>
              <h2>5</h2>
              <h2>6</h2>
              <h2>7</h2>
              <h2>8</h2>
              <h2>9</h2>
              <h2>10</h2>
              <h2>11</h2>
              <h2>12</h2>
              <h2>13</h2>
              <h2>14</h2>
              <h2>15</h2>
              <h2>16</h2>
              <h2>17</h2>
              <h2>18</h2>
              <h2>19</h2>
              <h2>20</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
