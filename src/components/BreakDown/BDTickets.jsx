import React, { useEffect, useState } from "react";
import { getOneLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";

const BDTickets = () => {
  // ! --- Local States ---------------------
  const [layoutObject, setLayoutObject] = useState({});
  const [isOpen, setIsOpen] = useState(0);
  const [containTables, setContainTables] = useState(false);
  console.log("🚀 ~ BDTickets ~ containTables:", containTables);

  const param = useParams();

  const getTheLayout = async () => {
    const response = await getOneLayout(param.layoutIdParam);

    if (response.success) {
      setLayoutObject(response.layout);
    }

    console.log("getTheLayout:", response);
    console.log("layoutObject:", layoutObject);
  };

  useEffect(() => {
    getTheLayout();
  }, [param.layoutIdParam]);

  useEffect(() => {
    if (layoutObject) {
      setContainTables(() =>
        layoutObject?.blocks?.some((block) => block.tables.length)
      );
    }
  }, [layoutObject]);

  return (
    <div className="BD-tickets-container">
      <div className="tickets-expectation">
        <div className="ticket-expectation-item">Total Tickets</div>
        <div className="ticket-expectation-item">Expected Return</div>
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
        </div>

        {/* ----- Block Mapping ------ */}
        {layoutObject?.blocks?.map((block, index) => (
          <div className="BD-Mapping-bigcontainer">
            <div className="BD-block-mapping-container">
              <div className="bd-div">
                <h1 className="BD-block-name">{block.name}</h1>
              </div>
              {containTables && (
                <div className="bd-div">
                  <h1 className="BD-block-name"></h1>
                </div>
              )}
              <div className="bd-div">
                <h1 className="BD-block-name">{block.maxCapacity}</h1>
              </div>

              <div className="bd-div">
                <h1 className="BD-block-name">{block.btickets}</h1>
              </div>
              <div className="bd-div">
                <h1 className="BD-block-name">{block.bprice}</h1>
              </div>
            </div>
            <div className="arrow down"></div>
          </div>
        ))}
      </div>
      <div className="breakdown-bg"></div>
    </div>
  );
};

export default BDTickets;
