import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { ConfirmAccount } from "./ConfirmAccount";
import { ResetPasswordContainer } from "./ResetPasswordContainer";
import "./styles/AuthContainer.css";

export const AuthContainer = ({ isLogin, isSignup, isConfirmAccount }) => {
    const { setAuthenticatedUserSession, signupData, setAndStoreSignupData, setAndStoreResetPasswordData } = useContext(AppContext);
    
    const navigate = useNavigate();

    const [isConfirmAccountFromLogin, setIsConfirmAccountFromLogin] = useState(false);
    const [formError, setFormError] = useState();
    const [formSuccess, setFormSuccess] = useState();
    const [isLoginFormSubmitting, setLoginFormIsSubmitting] = useState(false);
    const [isAccountConfirmationFormSubmitting, setAccountConfirmationFormIsSubmitting] = useState(false);
    const [isResendCodeSubmitting, setIsResendCodeSubmitting] = useState(false);

    const [confirmAccountData, setConfirmAccountData] = useState({
        email: "",
        confirmationCode: ""
    });

    const handleChange = (evt) => {
        if (isConfirmAccount) {
            const stateToChange = {...confirmAccountData};
            handleStateUpdate(evt, stateToChange);
            setConfirmAccountData(stateToChange);
        }
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (validForm()) {
            setFormError();
            if (isConfirmAccount) {
                setAccountConfirmationFormIsSubmitting(true);
                const updatedConfirmAccountData = {...confirmAccountData};
                const storedEmail = JSON.parse(sessionStorage.getItem("signupdata")).email;
                updatedConfirmAccountData.email = signupData.email !== "" ? signupData.email : storedEmail;
                authClient.confirmAccount(updatedConfirmAccountData)
                    .then(() => loginUser(JSON.parse(sessionStorage.getItem("signupdata"))))
                    .catch(err => {
                        setFormSuccess();
                        handleError(err, setFormError, setAccountConfirmationFormIsSubmitting);
                    });
            }
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
                    handleError(err, setFormError, setLoginFormIsSubmitting);
            });
    }

    const handleResendCode = () => {
        setFormSuccess();
        setIsResendCodeSubmitting(true);

        const email = JSON.parse(sessionStorage.getItem("signupdata")).email;
        authClient.resendConfirmationCode(email)
            .then(() => setFormSuccess(`A new code has been sent to: ${email}`))
            .catch(err => handleError(err, setFormError))
            .finally(() => setIsResendCodeSubmitting(false));
    }

    const validForm = () => {
        if (isConfirmAccount) {
            // don't check for email in this onSubmit validator because it's being set from appContext 
            if (confirmAccountData.confirmationCode.trim().length === 0) {
                setFormError("Confirmation code is required");
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
    }, [signupData, isConfirmAccountFromLogin])

    return (
        <div className="auth--container">
            <div className="auth-header--container">
                <ProjectBLogo style={{position: "relative", left: "40%", fontSize: 30.5}} isLink={false} />
                <h2 className="auth--header" style={isConfirmAccount ? {marginBottom: 14.5} : null}>
                    {isLogin ? 'Login' : isSignup ? 'Sign Up' : isConfirmAccount ? 'Enter Confirmation Code' : 'Reset Password'}
                </h2>
            </div>

            {formError !== undefined && <div className="form-error">{formError}</div>}
            {formSuccess !== undefined && <div className="form-success">{formSuccess}</div>}

            {isLogin ? (
                <Login setFormError={setFormError} />
            ) : isSignup ? (
                <SignUp 
                    setFormError={setFormError} 
                    setFormSuccess={setFormSuccess} 
                />
            ) : isConfirmAccount ? (
                <ConfirmAccount 
                    setFormError={setFormError}
                    setFormSuccess={setFormSuccess}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleResendCode={handleResendCode}
                    isFormSubmitting={isAccountConfirmationFormSubmitting}
                    isResendCodeSubmitting={isResendCodeSubmitting}
                />
            ) : <ResetPasswordContainer
                    setFormError={setFormError}
                    setFormSuccess={setFormSuccess}
                    setAndStoreResetPasswordData={setAndStoreResetPasswordData}
                />}
        </div>
    );
}