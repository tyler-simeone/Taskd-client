import React, { useState, createContext } from 'react';
import { Constants } from './util/Constants';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    /*
        Standard app states
    */
    const navigate = useNavigate();

    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const selectedBoardId = JSON.parse(sessionStorage.getItem("boardId"));

    const [boardId, setBoardId] = useState(selectedBoardId);
    const [boardIdHasChanged, setBoardIdHasChanged] = useState(false);
    const [boardHasChanged, setBoardHasChanged] = useState(false);
    const [boardName, setBoardName] = useState();

    const [taskTags, setTaskTags] = useState();
    const [taskTagsHaveChanged, setTaskTagsHaveChanged] = useState(false);
    const [taskTagsChangedTaskId, setTaskTagsChangedTaskId] = useState();
    
    const [isAddTagFromEditTask, setIsAddTagFromEditTask] = useState(false);
    const [tagFilterCriteria, setTagFilterCriteria] = useState([]);

    const [columnAdded, setColumnAdded] = useState(false);
    const [rerender, setRerender] = useState(false);

    const setSelectedBoardId = (boardIdParam) => {
        if (boardIdParam) {
            const boardIdFromStorage = JSON.parse(sessionStorage.getItem("boardId"));
            // Either initial load of board or changing boards
            if (!boardId || boardIdParam !== boardIdFromStorage) {
                setBoardId(parseInt(boardIdParam));
                setBoardIdHasChanged(true);
                sessionStorage.setItem("boardId", JSON.stringify(boardIdParam));
            }
        }
    };

    const handleRerender = () => setRerender(!rerender);
    const handleColumnAdded = () => setColumnAdded(!columnAdded);
    const closeError = () => setError();
    const closeSuccess = () => setSuccess();

    const showSuccess = (msg) => {
        setSuccess(msg);
        setTimeout(() => closeSuccess(), 5000)
    };

    /* 
        AUTH (session storage & user session related tasks)
    */ 
    //#region auth
    const [signupData, setSignupData] = useState({
        email: "",
        password: ""
    });
    const [resetPasswordData, setResetPasswordData] = useState({
        email: ""
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
        sessionStorage.clear();
        setUserSession();
        setJwtToken();
        setBoardId();
        navigate('/oauth/login');
    }

    const setAndStoreSignupData = (signupData) => {
        sessionStorage.setItem("signupdata", JSON.stringify(signupData));
        setSignupData(signupData);
    }

    const setAndStoreResetPasswordData = (resetPasswordData) => {
        sessionStorage.setItem("resetpassworddata", JSON.stringify(resetPasswordData));
        setResetPasswordData(resetPasswordData);
    }

    const signupEmail = () => {
        if (signupData.email !== "")
            return signupData.email;
        else 
            return JSON.parse(sessionStorage.getItem("signupdata"))?.email;
    }
    //#endregion auth
    /*
        END AUTH
    */

    /* 
        MODAL
    */ 
    //#region modal
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
        setModalHeader("New Task");
        setColumnId(columnId);
        setIsSideModalOpen(true);
    }
    
    const openAddTagModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_TAG);
        setModalHeader("New Tag");
        setIsSideModalOpen(true);
    }
    
    const openAddBoardModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_BOARD);
        setModalHeader("New Board");
        setIsSideModalOpen(true);
    }

    const openAddColumnModal = () => {
        setModalType(Constants.MODAL_TYPE.ADD_COLUMN);
        setModalHeader("New Column");
        setIsSideModalOpen(true);
    }

    const openViewTaskModal = (taskId, taskName) => {
        setModalType(Constants.MODAL_TYPE.VIEW_TASK);
        setModalHeader(taskName);
        setTaskId(taskId);
        setIsSideModalOpen(true);
        navigate(`/board?taskId=${taskId}`);
    }
    
    const openEditTaskModal = (taskId) => {
        setModalType(Constants.MODAL_TYPE.EDIT_TASK);
        setModalHeader("Update Task");
        setTaskId(taskId);
        setIsSideModalOpen(true);
        navigate(`/board?taskId=${taskId}&view=edit`);
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
    //#endregion modal
    /* 
        END MODAL 
    */


    const ctx = {
        boardId,
        boardName,
        boardHasChanged,
        boardIdHasChanged,
        isCenterModalOpen,
        isSideModalOpen,
        isAddTagFromEditTask,
        modalType,
        modalHeader,
        formError,
        columnId,
        columnAdded,
        taskId,
        error,
        success,
        rerender,
        deleteConfirmed,
        resourceToDelete,
        userSession,
        jwtToken,
        deleteModalArgs,
        resetPasswordData,
        signupData,
        taskTags,
        taskTagsHaveChanged,
        taskTagsChangedTaskId,
        tagFilterCriteria,
        closeSideModal,
        closeError,
        closeSuccess,
        closeDeleteConfirmationModal,
        closeDeleteConfirmationModalOnDelete,
        confirmDeletion,
        handleRerender,
        handleDelete,
        handleColumnAdded,
        isAuthenticated,
        logout,
        openDeleteConfirmationModal,
        openAddBoardModal,
        openAddColumnModal,
        openAddTaskModal,
        openAddTagModal,
        openEditColumnModal,
        openEditTaskModal,
        openViewTaskModal,
        signupEmail,
        setAuthenticatedUserSession,
        setBoardHasChanged,
        setBoardIdHasChanged,
        setBoardName,
        setSelectedBoardId,
        setDeleteConfirmed,
        setError,
        setFormError,
        setIsSideModalOpen,
        setIsCenterModalOpen,
        setIsAddTagFromEditTask,
        setSignupData,
        setAndStoreSignupData,
        setAndStoreResetPasswordData,
        showSuccess,
        setTaskTags,
        setTaskTagsHaveChanged,
        setTaskTagsChangedTaskId,
        setTagFilterCriteria
    }

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  );
};