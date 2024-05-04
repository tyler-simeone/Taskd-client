import React, { useState, useEffect, useContext } from 'react';
import Navigation from "./Navigation";
import ApplicationViews from './ApplicationViews'
import { CookiesProvider } from 'react-cookie';
import { ErrorAlert } from './components/controls/alerts/ErrorAlert';
import { SuccessAlert } from './components/controls/alerts/SuccessAlert';
import './App.css';

function App() {
    
    useEffect(() => {
        console.log("hi from app")
    }, []);
    
    return (
			// <CookiesProvider>
        <div className="App">
            <header className="App-header">
                <Navigation
                    // userType={userType}
                    // setUserType={setUserType}
                    // hasUser={hasUser}
                    // closeErrorMessage={closeErrorMessage}
                    // logOut={logOut}
                />

                {/* {userSignedOut === true && hasUser === true ? (
                    <LogoutSpinner />
                ) : (
                    <>
                        {errorMessage ? (
                            <ErrorAlert
                                show={show}
                                setShow={setShow}
                                errorMessage={errorMessage}
                            />
                        ) : null}
                        {successMessage ? (
                            <SuccessAlert
                                showSuccess={showSuccess}
                                setShowSuccess={setShowSuccess}
                                successMessage={successMessage}
                                setSuccessMessage={setSuccessMessage}
                            />
                        ) : null} */}

                        <ApplicationViews />
                    {/* </>
                )} */}
            </header>
        </div>
			// </CookiesProvider>
		);
}

export default App
