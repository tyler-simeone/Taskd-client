import React from "react";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { Link } from "react-router-dom";
import "./styles/AuthContainer.css";

export const SignUp = ({ handleChange, handleSubmit, isSubmitting }) => {
    return (
        <>
            <form className="auth--form">
                <Input id={"email"} label={"Email"} name={"email"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"Password"} name={"password"} handleChange={handleChange} />
                <Input id={"firstName"} type={"firstName"} label={"First Name"} name={"firstName"} handleChange={handleChange} />
                <Input id={"lastName"} type={"lastName"} label={"Last Name"} name={"lastName"} handleChange={handleChange} />
                <PrimaryButton text={"Sign In"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
            <div className="auth-link--container"><Link to={"/login"} className="signup-link">Back to login</Link></div>
        </>
    );
}