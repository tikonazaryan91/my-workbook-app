import React from "react";
import WorkplaceHistory from "./WorkplaceHistory";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";
import { workplacesConstant } from "../../../utils/constants";
import "./WorkplacesHistory.css";

const WorkplacesHistory = ({ loading, workplaces, onEdit, onDelete, role }) => {
  return (
    <>
      {loading && <Spinner />}
      {!workplaces?.length && !loading && (
        <h2>
          You haven't created any workplaces.You can add by clicking Add
          Workplace button.
        </h2>
      )}
      {workplaces?.length && (
        <>
          <div className="main-workplaces-history-header">
            <div className="main-workplaces-history-header-container">
              {workplacesConstant.map((contactConstant) => (
                <span key={contactConstant}>{contactConstant}</span>
              ))}
            </div>
            <div className="main-workplaces-history-header-style" />
          </div>
          {workplaces.map((workplace) => (
            <div
              className="main-workplaces-history-content-container"
              key={workplace.id}
            >
              <WorkplaceHistory workplace={workplace} />
              {role === "admin" && (
                <div className="main-workplaces-history-btn-item-container">
                  <Button btnType="update" onClick={() => onEdit(workplace)}>
                    Edit
                  </Button>
                  <Button btnType="delete" onClick={() => onDelete(workplace)}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default WorkplacesHistory;
