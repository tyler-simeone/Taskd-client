import React, { useState, useEffect, useContext } from 'react';
import { Constants } from './util/Constants';
import { Modal } from './components/features/Modal/Modal';
import { AddTask } from './components/task/AddTask';
import { Navigation } from "./components/navigation/Navigation";
import ApplicationViews from './ApplicationViews'
import { ModalView } from './components/features/Modal/ModalView';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState();
    const [modalHeader, setModalHeader] = useState("Add a Task");
    const [formError, setFormError] = useState();

    const openAddTaskModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_TASK);
        setModalHeader("Add a Task");
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
    }, [modalType]);

    return (    
        <div className="App">
            {isModalOpen ? (
                <Modal 
                    isOpen={isModalOpen} 
                    setIsModalOpen={setIsModalOpen} 
                    header={modalHeader}
                    closeModal={closeModal}
                    formError={formError} 
                    setFormError={setFormError}
                >
                    <ModalView 
                        modalType={modalType} 
                        formError={formError} 
                        setFormError={setFormError}
                    />
                </Modal>
            ) : null}
            <>
                <Navigation />
                <ApplicationViews openAddTaskModal={openAddTaskModal} closeModal={closeModal} />
            </>
        </div>
    );
}

export default App;
