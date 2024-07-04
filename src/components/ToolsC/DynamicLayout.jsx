import React, { useEffect, useState } from "react";
import { getOneLayout } from "../../services/layout.service";

const DynamicLayout = ({ layoutId, scale, edit, tooltip, formatPrices }) => {
  const [layoutObject, setlayoutObject] = useState({});
  const findOneLayout = async () => {
    try {
      const response = await getOneLayout(layoutId);
      if (response.success) {
        console.log("GetOneLayout - Response:", response);
        setlayoutObject(response.layout);
      }
    } catch (error) {
      console.log("GetOneLayout - Error:", error.response);
    }
  };

  useEffect(() => {
    if (layoutId) {
      findOneLayout();
    }
  }, [layoutId]);

  const formatNumber = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "k";
    } else {
      return num.toString();
    }
  };

  return (
    <div className="e-dashboard-parent">
      {edit && <h1 className="e-edit-item">Edit</h1>}
      <div
        style={{
          transform: `scale(${scale})`,
          border: "2px solid black",
          width: `${layoutObject?.width * scale}px`,
          height: `${layoutObject?.height * scale}px`,
          position: "relative",
        }}
      >
        {layoutObject?.shapes?.map((shape, index) => (
          <div
            style={{
              position: "absolute",
              width: `${shape?.width * scale}px`,
              height: `${shape?.height * scale}px`,
              backgroundColor: `${shape?.backgroundColor}`,
              left: `${shape?.x * scale}px`,
              top: `${shape?.y * scale}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: `center`,
              color: `${shape?.color}`,
            }}
            key={index}
          >
            <h1
              className="dashboard-table-number-child "
              style={{
                fontSize: `${shape?.fontSize * scale}px`,
                color: `${shape?.color}`,
              }}
            >
              {shape?.name}
            </h1>
          </div>
        ))}

        {layoutObject?.blocks?.map((block, index) => (
          <div
            style={{
              position: "absolute",
              width: `${block?.width * scale}px`,
              height: `${block?.height * scale}px`,
              backgroundColor: `${block?.backgroundColor}`,
              left: `${block?.x * scale}px`,
              top: `${block?.y * scale}px`,
              justifyContent: `${block?.justifyContent}`,
              alignItems: `${block?.alignItems}`,
              color: `${block?.color}`,
              border: `${block?.borderSize}px solid ${block?.borderColor}`,
              display: "flex",
              justifyContent: "center",
              alignItems: `center`,
              cursor: "pointer",
            }}
            key={index}
            className="dasboard-table-hover"
          >
            <h1
              className="dashboard-table-number-child dashboard-block-name-display"
              style={{ fontSize: `${block?.fontSize * scale}px` }}
            >
              {tooltip && !block.tables.length && (
                <div
                  className="dashboard-tooltip-block"
                  style={{
                    backgroundColor: `${block?.backgroundColor}`,
                  }}
                >
                  <h2 className="dashboard-tooltip-size">
                        <span className="dollar-span">$</span>
                        {formatPrices
                          ? formatNumber(block.bprice)
                          : block.bprice}
                      </h2>
                </div>
              )}

              {block?.name}
            </h1>
            <div className="dashboard-table-grid">
              {block?.tables?.map((table, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: `${table?.width * scale}px`,
                    height: `${table?.height * scale}px`,
                    backgroundColor: `${table?.backgroundColor}`,
                    left: `${table?.x * scale}px`,
                    top: `${table?.y * scale}px`,
                    justifyContent: `${table?.justifyContent}`,
                    alignItems: `${table?.alignItems}`,
                    color: `${table?.color}`,
                    border: `${table?.borderSize}px solid ${table?.borderColor}`,
                    borderRadius: `${table?.tableType === "Square" ? 0 : 50}%`,
                  }}
                  className="dashboard-table-number-parent"
                >
                  <h1 className="dashboard-table-number-parent">
                    {table?.number}
                  </h1>
                  {tooltip && (
                    <div
                      className="dashboard-tooltip"
                      style={{
                        backgroundColor: `${table?.backgroundColor}`,
                        borderRadius: `${
                          table?.tableType === "Square" ? 0 : 50
                        }%`,
                      }}
                    >
                      <h2 className="dashboard-tooltip-size">
                        <span className="dollar-span">$</span>
                        {formatPrices
                          ? formatNumber(table.tprice)
                          : table.tprice}
                      </h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicLayout;
