import { useContext, useEffect } from "react";
import { BreakDownContext } from "../../context/breakdown.context";
import { getOneLayout } from "../../services/layout.service";
import { useParams } from "react-router-dom";
const BDNavBar = () => {
    const { selectedMenu, setSelectedMenu } = useContext(BreakDownContext);
//   const param = useParams();

//   console.log("param:", param);

//   const getTheLayout = async () => {
//     const response = await getOneLayout(param.layoutIdParam);

//     console.log("getTheLayout:", response);
//   };

//   useEffect(() => {
//     getTheLayout();
//   }, [param.layoutIdParam]);

  return (
    <div className="bd-container">
      <button
        onClick={() => setSelectedMenu("tickets")}
        className={selectedMenu !== "tickets" ? "bd-deactivated" : ""}
      >
        Tickets
      </button>
      <button
        onClick={() => setSelectedMenu("dashboard")}
        className={selectedMenu !== "dashboard" ? "bd-deactivated" : ""}
      >
        Dashboard
      </button>
    </div>
  );
};

export default BDNavBar;
