import React, { useState, useEffect, useContext } from 'react';
import { Navigation } from "./components/navigation/Navigation";
import ApplicationViews from './ApplicationViews'
import './App.css';

function App() {
    
    return (
        <div className="App">
            <Navigation />
            <ApplicationViews />
        </div>
    );
}

export default App
