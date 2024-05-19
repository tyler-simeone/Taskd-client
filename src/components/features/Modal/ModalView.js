import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { Constants } from "../../../util/Constants";
import { ViewTask } from "../../task/ViewTask";
import { AddTask } from "../../task/AddTask";
import { AddColumn } from "../../column/AddColumn";
import { EditTask } from "../../task/EditTask";
import { EditColumn } from "../../column/EditColumn";

export const ModalView = () => {

    const { 
        modalType,
        columnId,
        taskId,
        openViewTaskModal,
        openEditTaskModal,
        closeSideModal,
        handleRerender,
        setFormError,
        setError,
        setSuccess
     } = useContext(AppContext);

    const [modalView, setModalView] = useState();

    useEffect(() => {
        switch(modalType) {
            case Constants.MODAL_TYPE.VIEW_TASK:
                setModalView(<ViewTask 
                                taskId={taskId} 
                                openEditTaskModal={openEditTaskModal} 
                                setError={setError} 
                                handleRerender={handleRerender} 
                                closeSideModal={closeSideModal} 
                             />);
                break;
            case Constants.MODAL_TYPE.ADD_TASK:
                setModalView(<AddTask 
                                setFormError={setFormError} 
                                setError={setError} 
                                closeSideModal={closeSideModal} 
                                columnId={columnId} 
                                handleRerender={handleRerender}
                             />);
                break;
            case Constants.MODAL_TYPE.ADD_COLUMN:
                setModalView(<AddColumn 
                                setFormError={setFormError} 
                                setError={setError} 
                                closeSideModal={closeSideModal} 
                                handleRerender={handleRerender} 
                             />);
                break;
            case Constants.MODAL_TYPE.EDIT_TASK:
                setModalView(<EditTask 
                                setError={setError} 
                                setSuccess={setSuccess} 
                                setFormError={setFormError} 
                                taskId={taskId} 
                                openViewTaskModal={openViewTaskModal} 
                                handleRerender={handleRerender} 
                             />);
                break;
            case Constants.MODAL_TYPE.EDIT_COLUMN:
                setModalView(<EditColumn 
                                setError={setError} 
                                setSuccess={setSuccess} 
                                setFormError={setFormError} 
                                columnId={columnId} 
                                handleRerender={handleRerender} 
                                closeSideModal={closeSideModal} 
                             />);
                break;
            default:
                break;
        }
    }, [modalType]);

    return (
        <>
            {modalView}
        </>
    );
}