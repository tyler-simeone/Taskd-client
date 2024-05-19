import React, { useEffect, useContext } from 'react';
import { AppContext } from './AppContextProvider';
import { Modal } from './components/features/modal/Modal';
import { Navigation } from "./components/navigation/Navigation";
import { ErrorMessage } from './components/features/error/ErrorMessage';
import { SuccessMessage } from './components/features/success/SuccessMessage';
import ApplicationViews from './ApplicationViews'
import { ModalView } from './components/features/modal/ModalView';
import './App.css';

function App() {
    const { 
        isModalOpen,
        modalType,
        columnId,
        taskId,
        error,
        success
     } = useContext(AppContext);    


    useEffect(() => {
    }, [modalType, taskId, columnId]);

    return (    
        <div className="App">
            {isModalOpen && error === undefined && <Modal><ModalView /></Modal>}

            <Navigation />

            {error !== undefined ? <ErrorMessage /> : null}
            {success !== undefined ? <SuccessMessage /> : null}
            
            <ApplicationViews />
        </div>
    );
}

export default App;
