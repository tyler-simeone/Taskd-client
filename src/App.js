import React, { useState, useEffect, useContext } from 'react';
import { Navigation } from "./components/navigation/Navigation";
import ApplicationViews from './ApplicationViews'
// import { CookiesProvider } from 'react-cookie';
import { ErrorAlert } from './components/alerts/ErrorAlert';
import { SuccessAlert } from './components/alerts/SuccessAlert';
import './App.css';

function App() {
    
    useEffect(() => {
        console.log("hi from app")
    }, []);
    
    return (
        <div className="App">
            <Navigation />
            <ApplicationViews />
        </div>
    );
}

export default App
