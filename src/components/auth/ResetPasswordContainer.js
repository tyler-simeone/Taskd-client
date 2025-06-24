import React, { useState, useEffect } from "react";
import { ResetPasswordStepOne } from "./ResetPasswordStepOne";
import { ResetPasswordStepTwo } from "./ResetPasswordStepTwo";
import { Navigate, useNavigate } from "react-router-dom";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import "./styles/AuthContainer.css";

export const ResetPasswordContainer = ({ setFormError, setFormSuccess, setAndStoreResetPasswordData }) => {
    const navigate = useNavigate();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordResetUserConfirmed, setPasswordResetUserConfirmed] = useState(false);
    const [passwordResetFormData, setPasswordResetFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...passwordResetFormData};
        handleStateUpdate(evt, stateToChange);
        setPasswordResetFormData(stateToChange);
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (validForm()) {
            setFormError();
            setIsSubmitting(true);
            const email = passwordResetFormData.email;

            if (!passwordResetUserConfirmed) { // step one - user receives confirmation code email
                authClient.initiateResetPassword(email)
                    .then(() => {
                        setAndStoreResetPasswordData(email);
                        setPasswordResetUserConfirmed(true);
                        setIsSubmitting(false);
                    })
                    .catch(err => {
                        setFormSuccess();
                        handleError(err, setFormError, setIsSubmitting);
                    });
            } else { // step two - fulfill the password reset
                const resetPasswordRequest = {
                    email: email,
                    newPassword: passwordResetFormData.confirmPassword,
                    confirmationCode: passwordResetFormData.confirmationCode
                }
                authClient.resetPassword(resetPasswordRequest)
                    .then(() => navigate("/oauth/login"))
                    .catch(err => {
                        setFormSuccess();
                        handleError(err, setFormError, setIsSubmitting);
                    });
            }
        }
    }

    const validForm = () => {
        if (!passwordResetUserConfirmed) {
            if (passwordResetFormData.email.trim().length === 0) {
                setFormError("Email is required");
                return false;
            } 
        } else {
            if (passwordResetFormData.password !== passwordResetFormData.confirmPassword) {
                setFormError("Passwords do not match");
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        setFormError();
    }, []);
    
    return (
        <>
            {!passwordResetUserConfirmed ? (
                <ResetPasswordStepOne handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
            ) : (
                <ResetPasswordStepTwo 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    setFormSuccess={setFormSuccess}
                    setFormError={setFormError}
                    isSubmitting={isSubmitting} 
                />   
            )}
        </>
    );
}