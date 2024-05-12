import React, { useState, useEffect, useContext } from 'react';
import { Modal } from './components/features/Modal/Modal';
import { Navigation } from "./components/navigation/Navigation";
import ApplicationViews from './ApplicationViews'
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (    
        <div className="App">
            {isModalOpen ? <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> : null}
            <>
                <Navigation />
                <ApplicationViews />
            </>
        </div>
    );
}

export default App;
