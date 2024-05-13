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
    const [task, setTask] = useState();

    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const openAddTaskModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_TASK);
        setModalHeader("Add a Task");
        setIsModalOpen(true);
    }

    const openViewTaskModal = (task) => {
        setModalType(Constants.MODAL_TYPE.VIEW_TASK);
        setModalHeader(task.taskName);
        setTask(task);
        setIsModalOpen(true);
    }
    
    const openEditTaskModal = (task) => {
        setModalType(Constants.MODAL_TYPE.EDIT_TASK);
        setModalHeader("Update Task");
        setTask(task);
        setIsModalOpen(true);
    }
    
    const closeModal = () => setIsModalOpen(false);
    const closeError = () => setError();
    const closeSuccess = () => setSuccess();

    useEffect(() => {
    }, [modalType, task]);

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
                        setFormError={setFormError}
                        task={task}
                        openEditTaskModal={openEditTaskModal}
                        openViewTaskModal={openViewTaskModal}
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
