import React, { useEffect, useContext } from 'react';
import { AppContext } from './AppContextProvider';
import { Modal } from './components/features/modal/Modal';
import { Navigation } from "./components/navigation/Navigation";
import { ErrorMessage } from './components/features/error/ErrorMessage';
import { SuccessMessage } from './components/features/success/SuccessMessage';
import { ModalView } from './components/features/modal/ModalView';
import { SideModal } from './components/features/modal/SideModal';
import { CenterModal } from './components/features/modal/CenterModal';
import { CenterModalView } from './components/features/modal/CenterModalView';
import ApplicationViews from './ApplicationViews'
import './App.css';

function App() {
    const { 
        isCenterModalOpen,
        isSideModalOpen,
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
            {error === undefined && success === undefined && 
                <Modal>
                    {isSideModalOpen && <SideModal><ModalView /></SideModal>}
                    {isCenterModalOpen && <CenterModal><CenterModalView /></CenterModal>}
                </Modal>
            }

            <Navigation />

            {error !== undefined ? <ErrorMessage /> : null}
            {success !== undefined ? <SuccessMessage /> : null}
            
            <ApplicationViews />
        </div>
    );
}

export default App;
