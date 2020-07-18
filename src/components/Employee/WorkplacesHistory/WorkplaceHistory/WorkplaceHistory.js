import React from "react";
import "./WorkplaceHistory.css";
import { workplacesConstantByOrder } from "../../../../utils/constants";

const WorkplaceHistory = ({ workplace }) => {
  return (
    <div className="main-workplaces-history-content-item-container">
      {workplacesConstantByOrder.map((workplaceConstant) => (
        <span key={workplaceConstant}>{workplace[workplaceConstant]}</span>
      ))}
    </div>
  );
};

export default React.memo(WorkplaceHistory);
