import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import Input from "../../UI/Input";
import Select from "../../UI/Select";
import Button from "../../UI/Button";
import { countries } from "../../../utils/countries";
import { formatDateYYYYMMdd } from "../../../utils/helperFunctions";
import schema from "./validation";
import "./WorkplacesAddEdit.css";

const WorkplacesAddEdit = ({ onSubmit, employeeId, workplace = {} }) => {
  const defaultValues = useMemo(
    () => ({
      ...workplace,
      employeeId,
      startDate: formatDateYYYYMMdd(workplace.startDate),
      endDate: formatDateYYYYMMdd(workplace.endDate),
    }),
    [workplace, employeeId]
  );
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const defaultCountry = useMemo(
    () => countries.find((c) => c.name === "Armenia"),
    []
  );

  return (
    <div className="main-workplaces-add">
      <h4>{workplace.id ? "Edit Workplaces" : "Add Workplace"}</h4>
      {Object.values(errors).length > 0 && (
        <div className="form-error">
          {Object.values(errors).map((err) => (
            <span key={err.message}>{err.message}</span>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="hidden" name="id" ref={register()} />
        <Input type="hidden" name="employeeId" ref={register()} />
        <Input
          type="date"
          name="startDate"
          placeholder="Start date"
          ref={register()}
          invalid={errors.startDate}
        />
        <Input
          type="date"
          name="endDate"
          placeholder="End Date"
          ref={register()}
          invalid={errors.endDate}
        />
        <Input
          name="company"
          placeholder="Company"
          ref={register()}
          invalid={errors.company}
        />
        <Select
          name="country"
          options={countries}
          placeholder="Company"
          ref={register()}
          defaultValue={defaultCountry}
          invalid={errors.country}
        />

        <Button
          btnType="success"
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isValid}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default WorkplacesAddEdit;
