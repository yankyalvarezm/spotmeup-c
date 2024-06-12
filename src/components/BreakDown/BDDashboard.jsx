import React, { useContext } from "react";
import { BlockContext } from "../../context/block.context";

const BDDashboard = () => {
  const { layoutObject } = useContext(BlockContext);

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
                          <span className=""></span>{" "}
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
                            block.btickets * block.btickets
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
        <div className="dasboard-box">
          <div className="dashboard-box-title">
            <h1 className="dashboard-title-h1">Sales</h1>
            <h1 className="dashboard-title-more">More</h1>
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
