import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { Constants } from "../../../util/Constants";
import { ViewTask } from "../../task/ViewTask";
import { AddTask } from "../../task/AddTask";
import { AddColumn } from "../../column/AddColumn";
import { EditTask } from "../../task/EditTask";
import { EditColumn } from "../../column/EditColumn";

export const CenterModalView = () => {

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