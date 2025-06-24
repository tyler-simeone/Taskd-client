import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { SecondaryButton } from "../../controls/buttons/SecondaryButton";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import "./styles/AuthContainer.css";

export const ConfirmAccount = ({ 
    setFormError,
    setFormSuccess,
    credentials
}) => {
    const [searchParams] = useSearchParams();
    const [isConfirmAccountFromLogin, setIsConfirmAccountFromLogin] = useState(false);
    const [isResendCodeSubmitting, setIsResendCodeSubmitting] = useState(false);

    const { signupData, setAuthenticatedUserSession } = useContext(AppContext);

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmAccountData, setConfirmAccountData] = useState({
        email: "",
        confirmationCode: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...confirmAccountData};
        handleStateUpdate(evt, stateToChange);
        setConfirmAccountData(stateToChange);
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (validForm()) {
            setFormError();
            setIsSubmitting(true);

            const updatedConfirmAccountData = {...confirmAccountData};
            const storedEmail = JSON.parse(sessionStorage.getItem("signupdata")).email;
            updatedConfirmAccountData.email = signupData.email !== "" ? signupData.email : storedEmail;
            authClient.confirmAccount(updatedConfirmAccountData)
                .then(() => loginUser(JSON.parse(sessionStorage.getItem("signupdata"))))
                .catch(err => {
                    setFormSuccess();
                    handleError(err, setFormError, setIsSubmitting);
                });
        }
    }

    const loginUser = (credentials) => {
        authClient.signIn(credentials)
            .then(resp => {
                sessionStorage.removeItem("signupdata");
                setAuthenticatedUserSession(resp.user, resp.authenticationResult.idToken);
                navigate("/board");
            })
            .catch(err => {
                if (err.detail === "User is not confirmed.")
                    navigate("/oauth/confirm?fromLogin=true");
                else 
                    handleError(err, setFormError);
            });
    }

    const handleResendCode = () => {
        setFormSuccess();
        setIsResendCodeSubmitting(true);

        const email = JSON.parse(sessionStorage.getItem("signupdata")).email;
        authClient.resendConfirmationCode(email)
            .then(() => {
                setFormSuccess(`A new code has been sent to: ${email}`);
                setTimeout(() => setFormSuccess(), 5000);
            })
            .catch(err => {
                setIsResendCodeSubmitting(false);
                handleError(err, setFormError);
            });
    }

    const validForm = () => {
        // don't check for email because it's being set from appContext 
        if (confirmAccountData.confirmationCode.trim().length === 0) {
            setFormError("Confirmation code is required");
            return false;
        }

        return true;
    }

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
                <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45}} />
                <SecondaryButton text={"Resend confirmation code"} handleClick={handleResendCode} isSubmitting={isResendCodeSubmitting} style={{marginTop: 8}} />
            </form>
        </>
    );
}