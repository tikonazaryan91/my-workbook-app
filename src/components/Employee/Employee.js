import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  contactsConstant,
  contactsConstantByOrder,
} from "../../utils/constants";
import Spinner from "../UI/Spinner";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import WorkplacesAddEdit from "./WorkplacesAddEdit";
import WorkplacesHistory from "./WorkplacesHistory";
import * as empActions from "../../redux/employeeList/actions";
import * as empSelectors from "../../redux/employeeList/selectors";
import * as workSelectors from "../../redux/workplaces/selectors";
import * as workActions from "../../redux/workplaces/actions";
import { roleSelector } from "../../redux/auth/selectors";

import "./Employee.css";

const Employees = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const workplaceLoading = useSelector(workSelectors.loadingSelector);
  const employeeLoading = useSelector(empSelectors.loadingSelector);
  const toEdit = useSelector(workSelectors.toEditSelector);
  const employee = useSelector((state) =>
    empSelectors.employeeByIdSelector(state, id)
  );
  const workplaces = useSelector(workSelectors.workplacesSelector);
  const role = useSelector(roleSelector);

  useEffect(() => {
    dispatch(empActions.fetchEmployee());
    dispatch(workActions.fetchWorkplaces(id));

    return () => dispatch(workActions.clearStore());
  }, [dispatch, id]);

  const handleDeleteWorkplace = useCallback(
    (workplaceData) => {
      dispatch(workActions.deleteWorkplace(workplaceData, id));
    },
    [dispatch, id]
  );

  const handleWorkplaceSave = useCallback(
    (workplaceData) => {
      dispatch(workActions.saveWorkplace(workplaceData, id));
    },
    [dispatch, id]
  );

  const handleShowAdd = useCallback(() => {
    dispatch(workActions.showAddEdit({}));
  }, [dispatch]);

  const handleShowAddEdit = useCallback(
    (workplaceData) => {
      dispatch(workActions.showAddEdit(workplaceData));
    },
    [dispatch]
  );

  const handleCloseAddEdit = useCallback(() => {
    dispatch(workActions.closeAddEdit());
  }, [dispatch]);

  return (
    <>
      {employeeLoading && !employee && <Spinner />}
      {employee && (
        <div className="main-employee">
          <h1>Employee contact details.</h1>
          <div className="main-employee-header">
            {contactsConstant.map((contactConstant) => (
              <span key={contactConstant}>{contactConstant}</span>
            ))}
          </div>
          <div className="main-employee-content">
            {contactsConstantByOrder.map((contactConstant) => (
              <span key={contactConstant}>{employee[contactConstant]}</span>
            ))}
          </div>
        </div>
      )}
      <div className="main-workplaces">
        <h2>Workplaces</h2>
        <div className="main-workplaces-content">
          <div className="main-workplaces-history">
            <h4>Workplaces History</h4>
            {role === "admin" && (
              <div className="main-workplaces-history-btn-container">
                <Button btnType="add" onClick={handleShowAdd}>
                  Add Workplace
                </Button>
              </div>
            )}
            <div className="main-workplaces-history-content">
              <div className="main-workplaces-history-content-data">
                <WorkplacesHistory
                  role={role}
                  workplaces={workplaces}
                  loading={workplaceLoading}
                  onEdit={handleShowAddEdit}
                  onDelete={handleDeleteWorkplace}
                />
              </div>
            </div>
          </div>
          {
            <Modal show={!!toEdit} modalClosed={handleCloseAddEdit}>
              <div className="main-workplaces-data-form">
                {toEdit && (
                  <WorkplacesAddEdit
                    workplace={toEdit}
                    onSubmit={handleWorkplaceSave}
                    employeeId={id}
                  />
                )}
              </div>
            </Modal>
          }
        </div>
      </div>
    </>
  );
};

export default Employees;
