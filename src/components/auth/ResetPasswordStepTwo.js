import React, { useContext } from "react";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { AppContext } from "../../AppContextProvider";
import "./styles/AuthContainer.css";

export const ResetPasswordStepTwo = ({ handleChange, handleSubmit, isSubmitting }) => {
    const { resetPasswordData } = useContext(AppContext);
    return (
        <>
            <form className="auth--form">
                <Input id={"email"} label={"Email"} name={"email"} value={resetPasswordData} isDisabled={true} />
                <Input id={"confirmationCode"} label={"Confirmation Code"} name={"confirmationCode"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"New Password"} name={"password"} handleChange={handleChange} />
                <Input id={"confirmPassword"} type={"password"} label={"Confirm New Password"} name={"confirmPassword"} handleChange={handleChange} />
                <PrimaryButton text={"Reset Password"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45, borderRadius: 8}} />
            </form>
        </>
    );
}