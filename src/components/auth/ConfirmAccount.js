import React, { useEffect, useState } from "react";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { SecondaryButton } from "../controls/buttons/SecondaryButton";
import { useSearchParams } from 'react-router-dom';
import "./styles/AuthContainer.css";

export const ConfirmAccount = ({ handleChange, handleSubmit, handleResendCode, isFormSubmitting, isResendCodeSubmitting }) => {
    const [searchParams] = useSearchParams();
    const [isConfirmAccountFromLogin, setIsConfirmAccountFromLogin] = useState(false);

    useEffect(() => {
        const confirmFromLogin = Boolean(searchParams.get("fromLogin"));
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
                <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isFormSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
                <SecondaryButton text={"Resend confirmation code"} handleClick={handleResendCode} isSubmitting={isResendCodeSubmitting} style={{marginTop: 8}} />
            </form>
        </>
    );
}