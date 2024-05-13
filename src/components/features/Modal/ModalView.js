import React, { useEffect, useState } from "react";
import { Constants } from "../../../util/Constants";
import { ViewTask } from "../../task/ViewTask";
import { AddTask } from "../../task/AddTask";
import { EditTask } from "../../task/EditTask";

export const ModalView = ({ modalType, setFormError, taskId, openEditTaskModal, openViewTaskModal, setError, setSuccess, closeModal }) => {
    const [modalView, setModalView] = useState();

    useEffect(() => {
        switch(modalType) {
            case Constants.MODAL_TYPE.VIEW_TASK:
                setModalView(<ViewTask taskId={taskId} openEditTaskModal={openEditTaskModal} setError={setError} />);
                break;
            case Constants.MODAL_TYPE.ADD_TASK:
                setModalView(<AddTask setFormError={setFormError} setError={setError} closeModal={closeModal} />);
                break;
            case Constants.MODAL_TYPE.EDIT_TASK:
                setModalView(<EditTask setError={setError} setSuccess={setSuccess} setFormError={setFormError} taskId={taskId} openViewTaskModal={openViewTaskModal} />);
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