import React, { useState, createContext } from 'react';
import { Constants } from './util/Constants';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    /*
        Standard app states
    */
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const selectedBoardId = JSON.parse(sessionStorage.getItem("boardId"));
    const [boardId, setBoardId] = useState(selectedBoardId);

    const setSelectedBoardId = (boardId) => {
        if (boardId !== undefined) {
            setBoardId(parseInt(boardId));
            sessionStorage.setItem("boardId", boardId);
        }
    };
    
    const navigate = useNavigate();

    const [rerender, setRerender] = useState(false);

    const closeError = () => setError();
    const closeSuccess = () => setSuccess();

    const showSuccess = (msg) => {
        setSuccess(msg);
        setTimeout(() => closeSuccess(), 5000)
    };

    const handleRerender = () => setRerender(!rerender);

    /* 
        AUTH (session storage & user session related tasks)
    */ 
    const [signupData, setSignupData] = useState({
        email: "",
        password: ""
    });

    const sessionUserInfo = JSON.parse(sessionStorage.getItem("user"));
    const sessionJwt = JSON.parse(sessionStorage.getItem("jwt"));
    const [userSession, setUserSession] = useState(sessionUserInfo);
    const [jwtToken, setJwtToken] = useState(sessionJwt);

    const setAuthenticatedUserSession = (authenticatedUser, jwtToken) => {
        sessionStorage.setItem("user", JSON.stringify(authenticatedUser));
        sessionStorage.setItem("jwt", JSON.stringify(jwtToken));
        setUserSession(authenticatedUser);
        setJwtToken(jwtToken);
    }

    const isAuthenticated = () => (sessionStorage.getItem("user") !== null && sessionStorage.getItem("jwt") !== null);
    
    const logout = () => {
        // sessionStorage.removeItem("user");
        // sessionStorage.removeItem("jwt");
        sessionStorage.clear();
        setUserSession();
        setJwtToken();
        navigate('/oauth/login');
    }

    /*
        END AUTH
    */


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
    
    const openAddBoardModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_BOARD);
        setModalHeader("Add a Board");
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
    const closeCenterModal = () => setIsCenterModalOpen(false);
    
    const closeDeleteConfirmationModalOnDelete = () => {
        closeSideModal();
        closeCenterModal();
    };

    const closeSideModal = () => {
        setTaskId();
        setIsSideModalOpen(false);
    };
    /* 
        END MODAL 
    */


    const ctx = {
        boardId,
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
        userSession,
        jwtToken,
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
        logout,
        openDeleteConfirmationModal,
        openAddBoardModal,
        openAddColumnModal,
        openAddTaskModal,
        openEditColumnModal,
        openEditTaskModal,
        openViewTaskModal,
        signupData,
        setAuthenticatedUserSession,
        setSelectedBoardId,
        setDeleteConfirmed,
        setError,
        setFormError,
        setIsSideModalOpen,
        setIsCenterModalOpen,
        setSignupData,
        showSuccess
    }

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  );
};