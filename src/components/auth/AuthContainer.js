import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { ConfirmAccount } from "./ConfirmAccount";
import { useSearchParams } from 'react-router-dom';
import "./styles/AuthContainer.css";

export const AuthContainer = ({ isLogin, isSignup, isConfirmAccount }) => {
    const { showSuccess, setError, setAuthenticatedUserSession, signupData, setAndStoreSignupData } = useContext(AppContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isConfirmAccountFromLogin, setIsConfirmAccountFromLogin] = useState(false);
    const [formError, setFormError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleChange = (evt) => {
        if (isLogin) {
            const stateToChange = {...credentials};
            handleStateUpdate(evt, stateToChange);
            setCredentials(stateToChange);
        } else if (isSignup) {
            const stateToChange = {...signUpFormData};
            handleStateUpdate(evt, stateToChange);
            setSignUpFormData(stateToChange);
        } else {
            const stateToChange = {...confirmAccountData};
            handleStateUpdate(evt, stateToChange);
            setConfirmAccountData(stateToChange);
        }
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (validForm()) {
            setIsSubmitting(true);

            if (isLogin) {
                loginUser(credentials)
            } else if (isSignup) {
                authClient.signUp(signUpFormData)
                    .then(() => {
                        const updatedSignupData = {...signupData};
                        updatedSignupData.email = signUpFormData.email;
                        updatedSignupData.password = signUpFormData.password;
                        setAndStoreSignupData(updatedSignupData);
                        navigate('/oauth/confirm');
                    })
                    .catch(err => handleError(err, setFormError))
                    .finally(() => setIsSubmitting(false));
            } else {
                const updatedConfirmAccountData = {...confirmAccountData};
                const storedEmail = JSON.parse(sessionStorage.getItem("signupdata")).email;
                updatedConfirmAccountData.email = signupData.email !== "" ? signupData.email : storedEmail;
                updatedConfirmAccountData.confirmationCode = updatedConfirmAccountData.confirmationCode;
                authClient.confirmAccount(updatedConfirmAccountData)
                    .then(() => loginUser(JSON.parse(sessionStorage.getItem("signupdata"))))
                    .catch(err => handleError(err, setFormError))
                    .finally(() => setIsSubmitting(false));
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
                    handleError(err, setFormError);
            })
            .finally(() => setIsSubmitting(false));
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
                setFormError("Password is required");
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
        } else {
            // don't check for email in this onSubmit validator because it's being set from appContext 
            if (confirmAccountData.confirmationCode.trim().length === 0) {
                setFormError("Confirmation code is required");
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        // console.log("searchParams.get('fromLogin'): ", searchParams.get("fromLogin"))
        // const confirmFromLogin = Boolean(searchParams.get("fromLogin"));
        // console.log("confirmFromLogin: ", confirmFromLogin);
        // if (isConfirmAccountFromLogin === false && confirmFromLogin)
        //     setIsConfirmAccountFromLogin(true);
    }, [signupData, signUpFormData, isConfirmAccountFromLogin])

    return (
        <div className="auth--container">
            <div className="auth-header--container">
                <ProjectBLogo style={{position: "relative", left: "40%", fontSize: 30.5}} isLink={false} />
                <h2 className="auth--header" style={isConfirmAccount ? {marginBottom: 14.5} : null}>{isLogin ? 'Login' : isSignup ? 'Sign Up' : 'Enter Confirmation Code'}</h2>
            </div>
            {formError !== undefined && (
                <div className="form-error">
                    {formError}
                </div>
            )}

            {isLogin ? (
                <Login handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
            ) : isSignup ? (
                <SignUp handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
            ) : <ConfirmAccount handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} isConfirmAccountFromLogin={isConfirmAccountFromLogin} />}
        </div>
    );
}