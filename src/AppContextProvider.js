import React, { useState, createContext } from 'react';
import { Constants } from './util/Constants';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const [rerender, setRerender] = useState(false);

    /* 
        AUTH (session storage & user session related tasks)
    */ 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    /* 
        MODAL
    */ 
    const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
    const [isSideModalOpen, setIsSideModalOpen] = useState(false);
    const [modalType, setModalType] = useState();
    const [modalHeader, setModalHeader] = useState();
    const [formError, setFormError] = useState();

    const [columnId, setColumnId] = useState();
    const [taskId, setTaskId] = useState();

    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState();
    const [deleteModalArgs, setDeleteModalArgs] = useState();

    const openAddTaskModal = (columnId) => {
        setModalType(Constants.MODAL_TYPE.ADD_TASK);
        setModalHeader("Add a Task");
        setColumnId(columnId);
        setIsSideModalOpen(true);
    }
    
    const openAddColumnModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_COLUMN);
        setModalHeader("Add a Column");
        setIsSideModalOpen(true);
    }

    const openViewTaskModal = (taskId, taskName) => {
        setModalType(Constants.MODAL_TYPE.VIEW_TASK);
        setModalHeader(taskName);
        setTaskId(taskId);
        setIsSideModalOpen(true);
    }
    
    const openEditTaskModal = (taskId) => {
        setModalType(Constants.MODAL_TYPE.EDIT_TASK);
        setModalHeader("Update Task");
        setTaskId(taskId);
        setIsSideModalOpen(true);
    }
   
    const openEditColumnModal = (columnId) => {
        setModalType(Constants.MODAL_TYPE.EDIT_COLUMN);
        setModalHeader("Update Column");
        setColumnId(columnId);
        setIsSideModalOpen(true);
    }
    
    const openDeleteConfirmationModal = (modalArgs) => {
        setModalType(Constants.MODAL_TYPE.CONFIRM_DELETE);
        setDeleteModalArgs(modalArgs);
        setResourceToDelete(modalArgs.resourceName);
        setIsCenterModalOpen(true);
    }

    const confirmDeletion = () => deleteModalArgs.callback(deleteModalArgs.resourceId);

    const handleDelete = () => setDeleteConfirmed(true);

    const closeDeleteConfirmationModal = () => closeCenterModal();
    
    const closeDeleteConfirmationModalOnDelete = () => {
        closeSideModal();
        closeCenterModal();
    };

    const closeSideModal = () => {
        setTaskId();
        setIsSideModalOpen(false);
    };

    const closeCenterModal = () => setIsCenterModalOpen(false);

    const closeError = () => setError();
    const closeSuccess = () => setSuccess();

    const handleRerender = () => setRerender(!rerender);

    const ctx = {
        isCenterModalOpen,
        isSideModalOpen,
        modalType,
        modalHeader,
        formError,
        columnId,
        taskId,
        error,
        success,
        rerender,
        deleteConfirmed,
        resourceToDelete,
        closeSideModal,
        closeError,
        closeSuccess,
        closeDeleteConfirmationModal,
        closeDeleteConfirmationModalOnDelete,
        confirmDeletion,
        deleteModalArgs,
        handleRerender,
        handleDelete,
        isAuthenticated,
        openDeleteConfirmationModal,
        openAddTaskModal,
        openAddColumnModal,
        openViewTaskModal,
        openEditTaskModal,
        openEditColumnModal,
        setDeleteConfirmed,
        setIsSideModalOpen,
        setIsCenterModalOpen,
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