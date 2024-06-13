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

                      <h1 className="dashboard-total-container">
                        {/* <span className="dashboard-square"></span>{" "} */}
                        {/* <h1 className="dashboard-table-name dashboard-total">Total:</h1> */}
                        <h1 className="dashboard-table-quantity dashboard-total-green dashboard-total">
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
            <div className="dasboard-circle">
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
              <span className="green-span">$</span>Purchasable
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDDashboard;
