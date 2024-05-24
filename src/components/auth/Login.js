import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

export const Login = () => {
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
        <div className="login--container">
            <div className="login-header--container">
                <ProjectBLogo style={{position: "relative", left: "40%", fontSize: 28.5}} isAuthenticated={isAuthenticated} />
                <h2 className="login--header">Login</h2>
            </div>
            {formError !== undefined && (
                <div className="form-error">
                    {formError}
                </div>
            )}
            <form className="login--form">
                <Input id={"email"} label={"Email"} name={"email"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"Password"} name={"password"} handleChange={handleChange} />
                <PrimaryButton text={"Sign In"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
        </div>
    );
}