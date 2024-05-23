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
        email: "",
        password: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...credentials};
        stateToChange[evt.target.name] = evt.target.value.trim();
        setCredentials(stateToChange);
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        authClient.signIn(credentials)
            .then(resp => {
                setSuccess("Sign up successful!");
                console.log("resp: ", resp);
            })
            .catch(err => {
                setError(err);
                console.log("err: ", err);
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <div className="login--container">
            <div className="login-header--container">
                <h2 className="login--header">Login</h2>
            </div>
            <form className="login--form">
                <Input id={"email"} label={"Email"} name={"email"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"Password"} name={"password"} handleChange={handleChange} />
                <PrimaryButton text={"Sign In"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 44.5, borderRadius: 8}} />
            </form>
        </div>
    );
}