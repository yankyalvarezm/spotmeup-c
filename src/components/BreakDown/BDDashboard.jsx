import React, { useContext } from "react";
import { BlockContext } from "../../context/block.context";

const BDDashboard = () => {
  const { layoutObject } = useContext(BlockContext);

  const totalBprice = layoutObject.blocks.reduce((acc, block) => {
    // console.log(block.bprice);
    return acc + block.totalBprice;
  }, 0);

  const totalTables = layoutObject.blocks.reduce(
    (acc, block) => acc + block.tables.length,
    0
  );

  const ticketsIncluded = layoutObject.blocks.reduce(
    (acc, block) =>
      acc + block.tables.reduce((acc, table) => acc + table.ticketsIncluded, 0),
    0
  );

  console.log("ticketsIncluded:", ticketsIncluded);

  const totalTickets = layoutObject.blocks.reduce((acc, block) => {
    console.log("totalTickets:", block.btickets);
    return acc + block.btickets;
  }, 0);

  console.log("totalBprice:", totalBprice);

  console.log("From BDDashborad:", layoutObject);

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout ">
        <h1 className="dashboard-title-h1 dasboard-layout-title">Layout</h1>
        {/* {layoutObject.blocks.map((block) => ( */}
        <div className="dashboard-layout-parent">
          <div
            style={{
              transform: `scale(0.55)`,
              border: "2px solid black",
              width: `${layoutObject.width}px`,
              height: `${layoutObject.height}px`,
              position: "relative",
            }}
          >
            {layoutObject.shapes.map((shape, index) => (
              <div
                style={{
                  position: "absolute",
                  width: `${shape.width}px`,
                  height: `${shape.height}px`,
                  backgroundColor: `${shape.backgroundColor}`,
                  left: `${shape.x}px`,
                  top: `${shape.y}px`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: `center`,
                  color: `${shape.color}`,
                }}
                key={index}
              >
                <h1
                  className="dashboard-table-number-child "
                  style={{
                    fontSize: `${shape.fontSize}px`,
                  }}
                >
                  {shape.name}
                </h1>
              </div>
            ))}

            {layoutObject.blocks.map((block, index) => (
              <div
                style={{
                  position: "absolute",
                  width: `${block.width}px`,
                  height: `${block.height}px`,
                  backgroundColor: `${block.backgroundColor}`,
                  left: `${block.x}px`,
                  top: `${block.y}px`,
                  justifyContent: `${block.justifyContent}`,
                  alignItems: `${block.alignItems}`,
                  color: `${block.color}`,
                  border: `${block.borderSize}px solid ${block.borderColor}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: `center`,
                  cursor: 'pointer'
                }}
                key={index}
                className="dasboard-table-hover"
              >
                <h1
                  className="dashboard-table-number-child dashboard-block-name-display"
                  style={{ fontSize: `${block.fontSize}px` }}
                >
                  {block.name}
                </h1>
                <div className="dashboard-table-grid">
                  {block.tables.map((table, index) => (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        width: `${table.width}px`,
                        height: `${table.height}px`,
                        backgroundColor: `${table.backgroundColor}`,
                        left: `${table.x}px`,
                        top: `${table.y}px`,
                        justifyContent: `${table.justifyContent}`,
                        alignItems: `${table.alignItems}`,
                        color: `${table.color}`,
                        border: `${table.borderSize}px solid ${table.borderColor}`,
                        borderRadius: `${
                          table.tableType === "Square" ? 0 : 50
                        }%`,
                      }}
                      className="dashboard-table-number-parent"
                    >
                      <h1 className="dashboard-table-number-parent">
                        {table.number}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ))} */}
      </div>
      <div className="dashboard-ticket-sales">
        <div className="dasboard-box">
          {/* Grid Start */}
          <div className="dashboard-separator">
            <div className="dashboard-box-title">
              <h1 className="dashboard-title-h1">Tickets</h1>
              <h1 className="dashboard-title-more">More</h1>
            </div>
            <div className="dashboard-grid">
              {/* {layoutObject.blocks.map((block, index) => {})} */}

              {layoutObject.blocks.map((block) => (
                <div className="dashboard-grid-item">
                  <h1 className="dashboard-block-name">{block.name}</h1>
                  {block.tables.length ? (
                    <div className="dashboard-item-container">
                      <h1 className="dashboard-block-name">
                        <span className="dashboard-square"></span>{" "}
                        <h1 className="dashboard-table-name">Tables:</h1>
                        <h1 className="dashboard-table-quantity">
                          {block.tables.length}
                        </h1>
                      </h1>
                      <h1 className="dashboard-block-name dashboard-nomargin">
                        <span className="dashboard-circle dashboard-tickets-label"></span>{" "}
                        <h1 className="dashboard-table-name ">Tickets:</h1>
                        <h1 className="dashboard-table-quantity">
                          {block.btickets}
                        </h1>
                      </h1>

                      <h1 className="dashboard-block-name dashboard-nomargin">
                        <span className="dashboard-circle dashboard-tickets-label"></span>{" "}
                        <h1 className="dashboard-table-name dashboard-included">
                          Included:
                        </h1>
                        <h1 className="dashboard-table-quantity ">
                          {block.totalTicketsIncluded}
                        </h1>
                      </h1>

                      <h1 className="dashboard-total-container dashboard-nomargin">
                        {/* <span className="dashboard-square"></span>{" "} */}
                        {/* <h1 className="dashboard-table-name dashboard-total">Total:</h1> */}
                        <h1 className="dashboard-table-quantity dashboard-total-green dashboard-total ">
                          ${formatNumberWithCommas(block.bprice)}
                        </h1>
                      </h1>
                    </div>
                  ) : null}

                  {!block.tables.length ? (
                    <div className="dashboard-item-container">
                      <div>
                        <div className="dashboard-block-name">
                          <span className="dashboard-circle"></span>{" "}
                          <h1 className="dashboard-table-name">Tickets:</h1>
                          <h1 className="dashboard-table-quantity">
                            {block.btickets}
                          </h1>
                        </div>
                        <div className="dashboard-block-name dashboard-price">
                          <span className="dashboard-price-icon"></span>{" "}
                          <h1 className="dashboard-table-name">Price:</h1>
                          <h1 className="dashboard-table-quantity ">
                            ${block.bprice}
                          </h1>
                        </div>
                      </div>
                      <div className="dashboard-total-container dashboard-nomargin">
                        {/* <span className="dashboard-circle"></span>{" "} */}
                        {/* <h1 className="dashboard-table-name dashboard-total">
                          Total:
                        </h1> */}
                        <h1 className="dashboard-table-quantity dashboard-total dashboard-total-green">
                          $
                          {formatNumberWithCommas(
                            block.bprice * block.btickets
                          )}
                        </h1>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {/* Grid End */}
          <div className="dashboard-box-footer">
            <h1 className="dashboard-footer-text">
              <span className="red-span">$</span> Not Purchasable
            </h1>
            <h1 className="dashboard-footer-text">
              <span className="green-span">$</span> Purchasable
            </h1>
          </div>
        </div>
        <div className="dashboard-box-two">
          <div className="dashboard-box-title">
            <h1 className="dashboard-title-h1">Sales</h1>
            <h1 className="dashboard-title-more">More</h1>
          </div>
          <div className="dashboard-sales-container">
            {/* ----------- Bubble 1 -------- */}
            <div className="dasboard-circle">
              <h1 className="dasboard-sales">
                {formatNumberWithCommas(totalBprice)}
              </h1>
              <h1 className="dasboard-sales-subtitle">
                Possible <br />
                Earnings
              </h1>
            </div>
            {/* ----------- Bubble 2 -------- */}

            <div className="dasboard-circle">
              <h1 className="dasboard-sales">
                {formatNumberWithCommas(totalTables)}
              </h1>
              <h1 className="dasboard-sales-subtitle">
                Total <br />
                Tables
              </h1>
            </div>
            {/* ----------- Bubble 3 -------- */}
            <div className="dasboard-circle">
              <h1 className="dasboard-sales">
                {formatNumberWithCommas(totalTickets)}
              </h1>
              <h1 className="dasboard-sales-subtitle">
                Total <br />
                Tickets
              </h1>
            </div>
            {/* ----------- Bubble 4 -------- */}
            <div className="dasboard-circle-red">
              <h1 className="dasboard-sales">
                {formatNumberWithCommas(ticketsIncluded)}
              </h1>
              <h1 className="dasboard-sales-subtitle">
                Tickets <br />
                Included
              </h1>
            </div>
          </div>

          <div className="dashboard-box-footer-two">
            <h1 className="dashboard-footer-text">
              <span className="red-span">$</span> Not Purchasable
            </h1>
            <h1 className="dashboard-footer-text">
              {" "}
              <span className="green-span">$</span> Purchasable
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDDashboard;
