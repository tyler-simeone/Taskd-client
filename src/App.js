import React, { useState, useEffect, useContext } from 'react';
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
        modalHeader,
        formError,
        columnId,
        taskId,
        error,
        success,
        rerender,
        openAddTaskModal,
        openAddColumnModal,
        openViewTaskModal,
        openEditTaskModal,
        openEditColumnModal,
        closeModal,
        closeError,
        closeSuccess,
        handleRerender,
        setIsModalOpen,
        setFormError,
        setError,
        setSuccess
     } = useContext(AppContext);

    


    useEffect(() => {
    }, [modalType, taskId, columnId]);

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
                        columnId={columnId}
                        closeModal={closeModal}
                        handleRerender={handleRerender}
                    />
                </Modal>
            ) : null}

            <Navigation />

            {error !== undefined ? <ErrorMessage message={error} closeErrorMessage={closeError} /> : null}
            {success !== undefined ? <SuccessMessage message={success} closeSuccessMessage={closeSuccess} /> : null}
            
            <ApplicationViews 
                openAddTaskModal={openAddTaskModal} 
                openAddColumnModal={openAddColumnModal}
                openViewTaskModal={openViewTaskModal} 
                openEditTaskModal={openEditTaskModal}
                openEditColumnModal={openEditColumnModal}
                closeModal={closeModal} 
                setError={setError}
                setSuccess={setSuccess}
                rerender={rerender}
                handleRerender={handleRerender}
            />
        </div>
    );
}

export default App;
