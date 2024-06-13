import React, { useContext, useEffect, useState } from "react";
import { getOneLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";
import { TableContext } from "../../context/table.context";
import { BlockContext } from "../../context/block.context";

const BDTickets = () => {
  // ! --- Local States ---------------------
  const { tShapeEdited } = useContext(TableContext);
  // const [layoutObject, setLayoutObject] = useState({});
  const { layoutObject, setLayoutObject } = useContext(BlockContext);
  const [isOpen, setIsOpen] = useState(0);
  const [containTables, setContainTables] = useState(false);
  // console.log("🚀 ~ BDTickets ~ containTables:", containTables);

  useEffect(() => {
    console.log("layoutObject:", layoutObject);
  }, [layoutObject]);

  useEffect(() => {
    if (layoutObject) {
      setContainTables(() =>
        layoutObject?.blocks?.some((block) => block.tables.length)
      );
    }
  }, [layoutObject, tShapeEdited]);

  const [dropDownNumber, setDropDownNumber] = useState(0);

  console.log("dropdownNumber:", dropDownNumber);

  const handleDropDown = (number) => {
    setDropDownNumber((dropDownNumber) => {
      return dropDownNumber === number ? null : number;
    });
  };

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // console.log("🚀 ~ BDTickets ~ layoutObject:", layoutObject);

  return (
    <div className="BD-tickets-container">
      <div className="tickets-expectation">
        <div className="ticket-expectation-item">Total Tickets</div>
        <div className="ticket-expectation-item">
          <h1 className="ticket-expected-return">Expected Return:</h1>
          <h1 className="ticket-expected-return-h1"> $5000</h1>
        </div>
      </div>

      <div className="bd-excel-container">
        <div className="bd-excel-titles-container">
          <h1 className="bd-excel-titles">Item</h1>
          {containTables && (
            <h1 className="bd-excel-titles">Tickets Included</h1>
          )}
          <h1 className="bd-excel-titles">Max Capacity</h1>
          <h1 className="bd-excel-titles">Tickets</h1>
          <h1 className="bd-excel-titles">Price</h1>
          <h1 className="bd-excel-titles arrow-container"></h1>
        </div>

        {/* ----- Block Mapping ------ */}
        {layoutObject?.blocks?.map((block, index) => (
          <div className="BD-Mapping-bigcontainer" key={index}>
            <div
              className="BD-block-mapping-container"
              onClick={() => handleDropDown(index)}
            >
              <div className="bd-div">
                <h1 className="BD-block-name">{block?.name}</h1>
              </div>

              <div className="bd-div">
                <h1 className="BD-block-name">
                  <h1 className="BD-block-name">
                    {block.tables.length ? block?.totalTicketsIncluded : "-"}
                  </h1>
                </h1>
              </div>

              <div className="bd-div">
                <h1 className="BD-block-name">{block?.maxCapacity}</h1>
              </div>

              <div className="bd-div">
                <h1 className="BD-block-name">{block?.btickets}</h1>
              </div>
              <div className="bd-div">
                <h1 className="BD-block-name">
                  ${formatNumberWithCommas(block.bprice)}
                </h1>
              </div>

              <div className="bd-div arrow-container">
                <div
                  className={block.tables.length ? "arrow down" : "hide"}
                ></div>
              </div>
            </div>
            {/* ------- Tables ------ */}
            <div
              className={
                dropDownNumber === index
                  ? "animation"
                  : "hide-dropdown animation"
              }
            >
              {block.tables.map((table, index) => (
                <div className="breakdown-table-container" key={index}>
                  <div className="breakdown-div">
                    <h1 className="breakdown-table">Table #{table.number}</h1>
                  </div>
                  <div className="breakdown-div">
                    <h1 className="breakdown-table">{table.ticketsIncluded}</h1>
                  </div>
                  <div className="breakdown-div">
                    <h1 className="breakdown-table">{table.maxCapacity}</h1>
                  </div>
                  <div className="breakdown-div">
                    <h1 className="breakdown-table">{table.tickets}</h1>
                  </div>
                  <div className="breakdown-div">
                    <h1 className="breakdown-table">
                      ${formatNumberWithCommas(table.tprice)}
                    </h1>
                  </div>
                  <div className="breakdown-div arrow-container">
                    {/* <h1 className="breakdown-table">{table.tprice}</h1> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="breakdown-bg"></div>
    </div>
  );
};

export default BDTickets;
