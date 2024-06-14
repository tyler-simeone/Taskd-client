import React, { useEffect, useState } from "react";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import "./styles/AuthContainer.css";

export const ConfirmAccount = ({ handleChange, handleSubmit, isSubmitting }) => {
    const [searchParams] = useSearchParams();
    const [isConfirmAccountFromLogin, setIsConfirmAccountFromLogin] = useState(false);
    useEffect(() => {
        console.log("searchParams.get('fromLogin'): ", searchParams.get("fromLogin"))
        const confirmFromLogin = Boolean(searchParams.get("fromLogin"));
        console.log("confirmFromLogin: ", confirmFromLogin);
        if (isConfirmAccountFromLogin === false && confirmFromLogin)
            setIsConfirmAccountFromLogin(true);
    }, isConfirmAccountFromLogin)
    return (
        <>
            {isConfirmAccountFromLogin === true ? (
                <p className="confirm-account--subheader">
                    Your account hasn't been confirmed yet. Please enter the confirmation code sent to your email to confirm it now.
                </p>
            ) : null}
            <form className="auth--form">
                <Input id={"confirmationCode"} label={"Confirmation Code"} name={"confirmationCode"} handleChange={handleChange} />
                <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
        </>
    );
}