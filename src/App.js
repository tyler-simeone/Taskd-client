import React, { useEffect, useContext } from 'react';
import ApplicationViews from './ApplicationViews'
import { AppContext } from './AppContextProvider';
import { Modal } from './components/features/modal/Modal';
import { Navigation } from "./components/navigation/Navigation";
import { ErrorMessage } from './components/features/error/ErrorMessage';
import { SuccessMessage } from './components/features/success/SuccessMessage';
import { ModalView } from './components/features/modal/ModalView';
import { SideModal } from './components/features/modal/SideModal';
import { CenterModal } from './components/features/modal/CenterModal';
import { CenterModalView } from './components/features/modal/CenterModalView';
import { CookiesProvider } from 'react-cookie';
import './App.css';

function App() {
    const { 
        isCenterModalOpen,
        isSideModalOpen,
        isAuthenticated,
        modalType,
        columnId,
        taskId,
        error,
        success,
        rerender
     } = useContext(AppContext);    


    useEffect(() => {
    }, [modalType, taskId, columnId, rerender]);

    return (    
        <CookiesProvider>
            <div className="App">
                {!error && !success && 
                    <Modal>
                        {isSideModalOpen && <SideModal><ModalView /></SideModal>}
                        {isCenterModalOpen && <CenterModal><CenterModalView /></CenterModal>}
                    </Modal>
                }

                {isAuthenticated() && <Navigation />}

                {error && <ErrorMessage />}
                {success && <SuccessMessage />}
                
                <ApplicationViews />
            </div>
        </CookiesProvider>
    );
}

export default App;