import React, { useState, createContext } from 'react';
import { Constants } from './util/Constants';

// Step 1: Create a context
export const AppContext = createContext();

// Step 2: Create a provider component
export const AppContextProvider = ({ children }) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState();
    const [modalHeader, setModalHeader] = useState();
    const [formError, setFormError] = useState();
    const [columnId, setColumnId] = useState();
    const [taskId, setTaskId] = useState();

    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const [rerender, setRerender] = useState(false);

    const openAddTaskModal = (columnId) => {
        setModalType(Constants.MODAL_TYPE.ADD_TASK);
        setModalHeader("Add a Task");
        setColumnId(columnId);
        setIsModalOpen(true);
    }
    
    const openAddColumnModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_COLUMN);
        setModalHeader("Add a Column");
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
   
    const openEditColumnModal = (columnId) => {
        setModalType(Constants.MODAL_TYPE.EDIT_COLUMN);
        setModalHeader("Update Column");
        setColumnId(columnId);
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setTaskId();
        setIsModalOpen(false);
    };
    const closeError = () => setError();
    const closeSuccess = () => setSuccess();

    const handleRerender = () => setRerender(!rerender);

    const ctx = {
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
    }

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  );
};