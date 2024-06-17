import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import "./styles/AuthContainer.css";

export const Login = ({ 
    // handleChange,
    // handleSubmit,
    setFormError 
}) => {
    const { setAuthenticatedUserSession } = useContext(AppContext);
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...credentials};
        handleStateUpdate(evt, stateToChange);
        setCredentials(stateToChange);
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (validForm()) {
            setFormError();
            setIsSubmitting(true);

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
                        handleError(err, setFormError, setIsSubmitting);
                });
        }
    }

    const validForm = () => {
        if (credentials.email.trim().length === 0) {
            setFormError("Email is required");
            return false;
        } else if (credentials.password.trim().length === 0) {
            setFormError("Password is required");
            return false;
        }

        return true;
    }

    return (
        <>
            <form className="auth--form">
                <Input id={"email"} label={"Email"} name={"email"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"Password"} name={"password"} handleChange={handleChange} />
                <PrimaryButton text={"Sign In"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
            <div className="login-links--container">
                <div className="auth-link--container"><Link to={"/oauth/register"} className="signup-link">Sign Up</Link></div>
                <div className="auth-link--container"><Link to={"/oauth/resetPassword"} className="signup-link">Forgot Password?</Link></div>
            </div>
        </>
    );
}