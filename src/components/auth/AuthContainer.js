import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { useNavigate, Link } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import "./styles/AuthContainer.css";

export const AuthContainer = ({ isLogin, isSignup }) => {
    const { showSuccess, setError, setAuthenticatedUserSession, isAuthenticated } = useContext(AppContext);

    const navigate = useNavigate();

    const [formError, setFormError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...credentials};
        stateToChange[evt.target.name] = evt.target.value.trim();
        setCredentials(stateToChange);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (credentials.email.trim().length === 0) {
            setFormError("Email is required");
            return;
        }
        else if (credentials.password.trim().length === 0) {
            setFormError("Password is required");
            return;
        }

        setIsSubmitting(true);
        authClient.signIn(credentials)
            .then(resp => {
                setAuthenticatedUserSession(resp);
                navigate('/board');
            })
            .catch(err => handleError(err, setFormError))
            .finally(() => setIsSubmitting(false));
    }

    return (
        <div className="auth--container">
            <div className="auth-header--container">
                <ProjectBLogo style={{position: "relative", left: "40%", fontSize: 30}} isLink={false} />
                <h2 className="auth--header">{isLogin ? 'Login' : 'Register'}</h2>
            </div>
            {formError !== undefined && (
                <div className="form-error">
                    {formError}
                </div>
            )}

            {isLogin ? (
                <Login handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
            ) : <SignUp handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </div>
    );
}