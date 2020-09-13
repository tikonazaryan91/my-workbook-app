import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";

import Input from "../UI/Input";
import Button from "../UI/Button";
import {addEmployee} from "../../redux/employeeList/actions";
import schema from "./validation";
import "./CreateEmployee.css";

const CreateEmployee = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {register, handleSubmit, errors, formState} = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleSave = useCallback(
        (data) => {
            dispatch(addEmployee(data, history));
        },
        [dispatch, history]
    );
    console.log("testing", history);

    return (
        <div className="main-contacts">
            <h4>Enter Employee data</h4>
            {Object.values(errors).length > 0 && (
                <div className="form-error">
                    {Object.values(errors).map((err) => (
                        <span key={err.message}>{err.message}</span>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit(handleSave)}>
                <Input
                    name="firstName"
                    placeholder="First Name"
                    ref={register()}
                    invalid={errors.firstName}
                />
                <Input
                    name="lastName"
                    placeholder="Last name"
                    ref={register()}
                    invalid={errors.lastName}
                />
                <Input
                    name="email"
                    placeholder="E-Mail"
                    ref={register()}
                    invalid={errors.email}
                />
                <Input
                    name="passport"
                    placeholder="Passport"
                    ref={register()}
                    invalid={errors.passport}
                />
                <Input
                    type="date"
                    name="birthDate"
                    placeholder="Birth Date"
                    ref={register()}
                    invalid={errors.birthDate}
                />
                <Button
                    btnType="success"
                    type="submit"
                    disabled={!formState.isValid}
                    onClick={handleSubmit(handleSave)}
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    );
};

export default CreateEmployee;
