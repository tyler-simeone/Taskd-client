import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { authClient } from "../../api/authClient";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import "./styles/Login.css";

export const Login = () => {
    const { setSuccess, setError } = useContext(AppContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...credentials};
        stateToChange[evt.target.name] = evt.target.value;
        setCredentials(stateToChange);
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        authClient.signUp(credentials)
            .then(() => setSuccess("Sign up successful!"))
            .catch(err => setError(err))
            .finally(() => setIsSubmitting(false));
    }

    return (
        <div className="login--container">
            <div className="login--header">

            </div>
            <form className="login--form">
                <Input label={"Email"} name={"username"} handleChange={handleChange} />
                <Input label={"Password"} name={"password"} handleChange={handleChange} />
                <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </form>
        </div>
    );
}