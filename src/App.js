import React, { useState, useEffect, useContext } from 'react';
import { Constants } from './util/Constants';
import { Modal } from './components/features/modal/Modal';
import { Navigation } from "./components/navigation/Navigation";
import { ErrorMessage } from './components/features/error/ErrorMessage';
import { SuccessMessage } from './components/features/success/SuccessMessage';
import ApplicationViews from './ApplicationViews'
import { ModalView } from './components/features/modal/ModalView';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState();
    const [modalHeader, setModalHeader] = useState("Add a Task");
    const [formError, setFormError] = useState();
    const [taskId, setTaskId] = useState();

    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const openAddTaskModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_TASK);
        setModalHeader("Add a Task");
        setIsModalOpen(true);
    }

    const openViewTaskModal = (taskId, taskName) => {
        setModalType(Constants.MODAL_TYPE.VIEW_TASK);
        setModalHeader(taskName);
        setTaskId(taskId);
        setIsModalOpen(true);
    }
    
    const openEditTaskModal = (taskId) => {
        setModalType(Constants.MODAL_TYPE.EDIT_TASK);
        setModalHeader("Update Task");
        setTaskId(taskId);
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setTaskId();
        setIsModalOpen(false);
    };
    const closeError = () => setError();
    const closeSuccess = () => setSuccess();

    useEffect(() => {
    }, [modalType, taskId]);

    return (    
        <div className="App">
            {isModalOpen && error === undefined ? (
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
                        setFormError={setFormError}
                        openEditTaskModal={openEditTaskModal}
                        openViewTaskModal={openViewTaskModal}
                        setError={setError}
                        setSuccess={setSuccess}
                        taskId={taskId}
                        closeModal={closeModal}
                    />
                </Modal>
            ) : null}

            <Navigation />

            {error !== undefined ? <ErrorMessage message={error} closeErrorMessage={closeError} /> : null}
            {success !== undefined ? <SuccessMessage message={success} closeSuccessMessage={closeSuccess} /> : null}
            
            <ApplicationViews 
                openAddTaskModal={openAddTaskModal} 
                openViewTaskModal={openViewTaskModal} 
                openEditTaskModal={openEditTaskModal}
                closeModal={closeModal} 
                setError={setError}
                setSuccess={setSuccess}
            />
        </div>
    );
}

export default App;
