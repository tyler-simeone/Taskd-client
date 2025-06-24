import React, { useContext, useState } from "react";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { SecondaryButton } from "../../controls/buttons/SecondaryButton";
import { AppContext } from "../../AppContextProvider";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import "./styles/AuthContainer.css";

export const ResetPasswordStepTwo = ({ handleChange, handleSubmit, setFormSuccess, setFormError, isSubmitting }) => {
    const { resetPasswordData } = useContext(AppContext);

    const [isResendCodeSubmitting, setIsResendCodeSubmitting] = useState(false);

    const handleResendCode = () => {
        setFormSuccess();
        setIsResendCodeSubmitting(true);

        authClient.resendConfirmationCode(resetPasswordData)
            .then(() => {
                setFormSuccess(`A new code has been sent to: ${resetPasswordData}`);
                setTimeout(() => setFormSuccess(), 5000);
            })
            .catch(err => {
                setIsResendCodeSubmitting(false);
                handleError(err, setFormError);
            });
    }

    return (
        <>
            <form className="auth--form">
                <Input id={"email"} label={"Email"} name={"email"} value={resetPasswordData} isDisabled={true} />
                <Input id={"confirmationCode"} label={"Confirmation Code"} name={"confirmationCode"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"New Password"} name={"password"} handleChange={handleChange} />
                <Input id={"confirmPassword"} type={"password"} label={"Confirm New Password"} name={"confirmPassword"} handleChange={handleChange} />
                <PrimaryButton text={"Reset Password"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45}} />
                <SecondaryButton text={"Resend confirmation code"} handleClick={handleResendCode} isSubmitting={isResendCodeSubmitting} style={{marginTop: 8}} />
            </form>
        </>
    );
}