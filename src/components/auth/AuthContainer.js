import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { ConfirmAccount } from "./ConfirmAccount";
import { ResetPasswordContainer } from "./ResetPasswordContainer";
import "./styles/AuthContainer.css";

export const AuthContainer = ({ isLogin, isSignup, isConfirmAccount }) => {
    const { setAndStoreResetPasswordData } = useContext(AppContext);
    
    const [formError, setFormError] = useState();
    const [formSuccess, setFormSuccess] = useState();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    return (
        <div className="auth--container">
            <div className="auth-header--container">
                <ProjectBLogo style={{position: "relative", left: "40%"}} isLink={false} />
                <h2 className="auth--header" style={isConfirmAccount ? {marginBottom: 14.5} : null}>
                    {isLogin ? 'Login' : isSignup ? 'Sign Up' : isConfirmAccount ? 'Enter Confirmation Code' : 'Reset Password'}
                </h2>
            </div>

            {formError !== undefined && <div className="form-error">{formError}</div>}
            {formSuccess !== undefined && <div className="form-success">{formSuccess}</div>}

            {isLogin ? (
                <Login 
                    credentials={credentials} 
                    setCredentials={setCredentials} 
                    setFormError={setFormError} 
                />
            ) : isSignup ? (
                <SignUp 
                    setFormError={setFormError} 
                    setFormSuccess={setFormSuccess} 
                />
            ) : isConfirmAccount ? (
                <ConfirmAccount 
                    setFormError={setFormError}
                    setFormSuccess={setFormSuccess}
                    credentials={credentials}
                />
            ) : <ResetPasswordContainer
                    setFormError={setFormError}
                    setFormSuccess={setFormSuccess}
                    setAndStoreResetPasswordData={setAndStoreResetPasswordData}
                />}
        </div>
    );
}