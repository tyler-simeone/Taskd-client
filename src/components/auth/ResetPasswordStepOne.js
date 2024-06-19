import React from "react";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import "./styles/AuthContainer.css";

export const ResetPasswordStepOne = ({ handleChange, handleSubmit, isSubmitting }) => {
    return (
        <>
            <form className="auth--form">
                <Input id={"email"} label={"Email"} name={"email"} handleChange={handleChange} />
                <PrimaryButton text={"Reset Password"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
        </>
    );
}