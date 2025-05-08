import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../AppContextProvider";
import { Input } from "../../controls/inputs/Input";
import { Checkbox } from "../../controls/inputs/Checkbox";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../api/authClient";
import { handleError } from "../../util/handleError";
import { useCookies } from 'react-cookie';
import "./styles/AuthContainer.css";

export const Login = ({ 
    setFormError,
    credentials,
    setCredentials
}) => {
    const { setAuthenticatedUserSession, closeError } = useContext(AppContext);
    const navigate = useNavigate();

    const [cssSubmitBtn, setCssSubmitBtn] = useState({
        marginTop: 12,
        height: 43.5,
        borderRadius: 6,
        fontWeight: 600,
        fontSize: 15.5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [emailCookie, setEmailCookie] = useState("te");
    const [cookies, setCookie, removeCookie] = useCookies([emailCookie]);
    const [authCookie, setAuthCookie] = useState();
    const [rememberMeCheckbox, setRememberMeCheckbox] =  useState();

    /*
        AUTH COOKIE
    */
    const setLoginCookie = (email) => {
        const expire = 60*60*24*365;
        var cookieSettings = { path: '/', maxAge: expire };
        setCookie(emailCookie, email, cookieSettings);
    }

    const checkForAuthCookie = () => {
        if (authCookie === undefined) {
            let cookieObj = {};

            document.cookie.split(';').forEach((cookie) => {
                let cookies = cookie.split('=')
                cookieObj[cookies[0].trim()] = cookies[1];
            });

            setAuthCookie(cookieObj);
        }
    }
    /*
        END AUTH COOKIE
    */

    /*
        REMEMBER ME
    */
    const handleRememberMeCheckboxChange = (isChecked) => {
        const checkbox = {...rememberMeCheckbox};
        checkbox.checked = isChecked;
        
        if (!isChecked)
            removeCookie(emailCookie, {path:'/'});

        setRememberMeCheckbox(checkbox);    
    }

    const decodeEmailCookie = (cookie) => {
        const cookieCutter = cookie.split(';');
        const email = cookieCutter.filter(x => x.includes('te='))[0].trim().split('=')[1];
        return decodeURIComponent(email)
    }

    const checkForRememberMeCookie = () => {
        if (rememberMeCheckbox.checked)
            return;

        if (document.cookie.includes(emailCookie)) {
            const stateToChange = { ...credentials };
            stateToChange.email = decodeEmailCookie(document.cookie);
            setCredentials(stateToChange);

            // set as checked
            document.getElementById("remember-me").checked = true;
            const checkbox = {...rememberMeCheckbox};
            checkbox.checked = true;
            setRememberMeCheckbox(checkbox);
        }
    }

    const checkForRememberMe = () => {
        const checkbox = document.getElementById("remember-me");

        // set checkbox to state
        if (checkbox && !rememberMeCheckbox)
            setRememberMeCheckbox(checkbox);        

        // try load email cookie
        if (!credentials.email && rememberMeCheckbox)
            checkForRememberMeCookie(); 
    }
    /*
        END REMEMBER ME
    */

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
                    if (document.getElementById("remember-me").checked)
                        setLoginCookie(credentials.email);
                    setAuthenticatedUserSession(resp.user, resp.authenticationResult.idToken);
                    closeError();
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

    useEffect(() => {
        // clear errors on initial load
        setFormError();
    }, []);
    
    useEffect(() => {
        checkForRememberMe();
    }, [rememberMeCheckbox]);

    useEffect(() => {
        checkForAuthCookie();
    }, [cookies, authCookie])

    return (
        <>
            <form className="auth--form">
                <Input id={"email"} className={"login"} label={"Email"} name={"email"} handleChange={handleChange} value={credentials.email && credentials.email} />
                <Input id={"password"} className={"login"} type={"password"} label={"Password"} name={"password"} handleChange={handleChange} />
                <Checkbox id={"remember-me"} className={"login"} label={"Remember Me"} name={"rememberMe"} handleChange={handleRememberMeCheckboxChange} />
                <PrimaryButton text={"Sign In"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} style={cssSubmitBtn} />
            </form>
            <div className="login-links--container">
                <div className="auth-link--container"><Link to={"/oauth/register"} className="signup-link">Sign Up</Link></div>
                <div className="auth-link--container"><Link to={"/oauth/resetPassword"} className="signup-link">Forgot Password?</Link></div>
            </div>
        </>
    );
}