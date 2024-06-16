import React from "react";
import { ResetPasswordStepOne } from "./ResetPasswordStepOne";
import { ResetPasswordStepTwo } from "./ResetPasswordStepTwo";
import "./styles/AuthContainer.css";

export const ResetPasswordContainer = ({ handleChange, handleSubmit, isSubmitting, userConfirmed }) => {
    return (
        !userConfirmed ? (
            <ResetPasswordStepOne handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
        ) : (
            <ResetPasswordStepTwo handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />   
        )
    );
}