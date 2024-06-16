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
import { useSearchParams } from 'react-router-dom';
import "./styles/AuthContainer.css";

export const AuthContainer = ({ isLogin, isSignup, isConfirmAccount, isResetPassword }) => {
    const { showSuccess, setError, setAuthenticatedUserSession, signupData, setAndStoreSignupData, setAndStoreResetPasswordData } = useContext(AppContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isConfirmAccountFromLogin, setIsConfirmAccountFromLogin] = useState(false);
    const [formError, setFormError] = useState();
    const [formSuccess, setFormSuccess] = useState();
    const [isLoginFormSubmitting, setLoginFormIsSubmitting] = useState(false);
    const [isSignupFormSubmitting, setSignupFormIsSubmitting] = useState(false);
    const [isAccountConfirmationFormSubmitting, setAccountConfirmationFormIsSubmitting] = useState(false);
    const [isResendCodeSubmitting, setIsResendCodeSubmitting] = useState(false);
    const [isPasswordResetSubmitting, setIsPasswordResetSubmitting] = useState(false);
    const [passwordResetUserConfirmed, setPasswordResetUserConfirmed] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [signUpFormData, setSignUpFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });
    const [confirmAccountData, setConfirmAccountData] = useState({
        email: "",
        confirmationCode: ""
    });
    const [passwordResetFormData, setPasswordResetFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (evt) => {
        if (isLogin) {
            const stateToChange = {...credentials};
            handleStateUpdate(evt, stateToChange);
            setCredentials(stateToChange);
        } else if (isSignup) {
            const stateToChange = {...signUpFormData};
            handleStateUpdate(evt, stateToChange);
            setSignUpFormData(stateToChange);
        } else if (isConfirmAccount) {
            const stateToChange = {...confirmAccountData};
            handleStateUpdate(evt, stateToChange);
            setConfirmAccountData(stateToChange);
        } else {
            const stateToChange = {...passwordResetFormData};
            handleStateUpdate(evt, stateToChange);
            setPasswordResetFormData(stateToChange);
        }
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (validForm()) {
            if (isLogin) {
                setLoginFormIsSubmitting(true);
                loginUser(credentials);
            } else if (isSignup) {
                setSignupFormIsSubmitting(true);
                authClient.signUp(signUpFormData)
                    .then(() => {
                        const updatedSignupData = {...signupData};
                        updatedSignupData.email = signUpFormData.email;
                        updatedSignupData.password = signUpFormData.password;
                        setAndStoreSignupData(updatedSignupData);
                        navigate('/oauth/confirm');
                    })
                    .catch(err => {
                        setFormSuccess();
                        handleError(err, setFormError, setSignupFormIsSubmitting);
                    });
            } else if (isConfirmAccount) {
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
            } else { // Reset Password
                setIsPasswordResetSubmitting(true);
                const email = passwordResetFormData.email;

                if (!passwordResetUserConfirmed) { // step one - user receives confirmation code email
                    authClient.initiateResetPassword(email)
                        .then(() => {
                            setAndStoreResetPasswordData(email);
                            setPasswordResetUserConfirmed(true);
                            setIsPasswordResetSubmitting(false);
                        })
                        .catch(err => {
                            setFormSuccess();
                            handleError(err, setFormError, setIsPasswordResetSubmitting);
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
                            handleError(err, setFormError, setIsPasswordResetSubmitting);
                        });
                }
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
        if (isLogin) {
            if (credentials.email.trim().length === 0) {
                setFormError("Email is required");
                return false;
            }
            else if (credentials.password.trim().length === 0) {
                setFormError("Password is required");
                return false;
            }
        } else if (isSignup) {
            if (signUpFormData.email.trim().length === 0) {
                setFormError("Email is required");
                return false;
            } else if (signUpFormData.password.trim().length === 0) {
                setFormError("Password is required");
                return false;
            } else if (signUpFormData.confirmPassword.trim().length === 0) {
                setFormError("Confirm Password is required");
                return false;
            } else if (signUpFormData.password !== signUpFormData.confirmPassword) {
                setFormError("Passwords do not match");
                return false;
            } else if (signUpFormData.firstName.trim().length === 0) {
                setFormError("First Name is required");
                return false;
            } else if (signUpFormData.lastName.trim().length === 0) {
                setFormError("Last Name is required");
                return false;
            }
            const stateToChange = {...signUpFormData};
            delete stateToChange.confirmPassword;
            setSignUpFormData(stateToChange);
        } else if (isConfirmAccount) {
            // don't check for email in this onSubmit validator because it's being set from appContext 
            if (confirmAccountData.confirmationCode.trim().length === 0) {
                setFormError("Confirmation code is required");
                return false;
            }
        } else {
            if (passwordResetFormData.email.trim().length === 0) {
                setFormError("Email is required");
                return false;
            } 
            // else if (passwordResetFormData.password.trim().length === 0) {
            //     setFormError("Password is required");
            //     return false;
            // } else if (passwordResetFormData.confirmPassword.trim().length === 0) {
            //     setFormError("Confirm Password is required");
            //     return false;
            // } 
        }
        return true;
    }

    useEffect(() => {
    }, [signupData, signUpFormData, isConfirmAccountFromLogin, passwordResetUserConfirmed])

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
                <Login handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isLoginFormSubmitting} />
            ) : isSignup ? (
                <SignUp handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSignupFormSubmitting} />
            ) : isConfirmAccount ? (
                <ConfirmAccount 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleResendCode={handleResendCode}
                    isFormSubmitting={isAccountConfirmationFormSubmitting}
                    isResendCodeSubmitting={isResendCodeSubmitting}
                />
            ) : <ResetPasswordContainer 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isSubmitting={isPasswordResetSubmitting}
                    userConfirmed={passwordResetUserConfirmed} 
                />}
        </div>
    );
}