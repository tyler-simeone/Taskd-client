import React from "react";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import "./styles/AuthContainer.css";

export const Login = ({ handleChange, handleSubmit, isSubmitting }) => {
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