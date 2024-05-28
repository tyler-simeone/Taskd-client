import React from "react";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import "./styles/AuthContainer.css";

export const ConfirmAccount = ({ handleChange, handleSubmit, isSubmitting }) => {
    return (
        <>
            <form className="auth--form">
                <Input id={"confirmationCode"} label={"Confirmation Code"} name={"confirmationCode"} handleChange={handleChange} />
                <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
        </>
    );
}