import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import "./styles/AuthContainer.css";

export const SignUp = ({ 
    setFormError,
    setFormSuccess
}) => {
    const { signupData, setAndStoreSignupData } = useContext(AppContext);

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signUpFormData, setSignUpFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (evt) => {
        const stateToChange = {...signUpFormData};
        handleStateUpdate(evt, stateToChange);
        setSignUpFormData(stateToChange);
    }

    const handleStateUpdate = (evt, stateToChange) => stateToChange[evt.target.name] = evt.target.value?.trim();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (validForm()) {
            setFormError();
            setIsSubmitting(true);

            const signUpRequest = {...signUpFormData};
            delete signUpRequest.confirmPassword;
            
            authClient.signUp(signUpRequest)
                .then(() => {
                    const updatedSignupData = {...signupData};
                    updatedSignupData.email = signUpFormData.email;
                    updatedSignupData.password = signUpFormData.password;
                    setAndStoreSignupData(updatedSignupData);
                    navigate('/oauth/confirm');
                })
                .catch(err => {
                    setFormSuccess();
                    handleError(err, setFormError, setIsSubmitting);
                });
        }
    }

    const validForm = () => {
        if (signUpFormData.email.trim().length === 0) {
            setFormError("Email is required");
            return false;
        } else if (signUpFormData.password.trim().length === 0) {
            setFormError("Password is required");
            return false;
        } else if (signUpFormData.confirmPassword.trim().length === 0) {
            setFormError("Confirm Password is required");
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
        return true;
    }

    useEffect(() => {
    }, [signupData, signUpFormData])

    useEffect(() => {
        setFormError();
    }, []);

    return (
        <>
            <form className="auth--form">
                <Input id={"email"} label={"Email"} name={"email"} handleChange={handleChange} />
                <Input id={"password"} type={"password"} label={"Password"} name={"password"} handleChange={handleChange} />
                <Input id={"confirmPassword"} type={"password"} label={"Confirm Password"} name={"confirmPassword"} handleChange={handleChange} />
                <Input id={"firstName"} type={"firstName"} label={"First Name"} name={"firstName"} handleChange={handleChange} />
                <Input id={"lastName"} type={"lastName"} label={"Last Name"} name={"lastName"} handleChange={handleChange} />
                <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={{marginTop: 12, height: 45}} />
            </form>
            <div className="auth-link--container"><Link to={"/oauth/login"} className="signup-link">Back to login</Link></div>
        </>
    );
}