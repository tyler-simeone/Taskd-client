import React, { useEffect, useState } from "react";
import { Constants } from "../../../util/Constants";
import { ViewTask } from "../../task/ViewTask";
import { AddTask } from "../../task/AddTask";
import { EditTask } from "../../task/EditTask";

export const ModalView = ({ modalType, setFormError, task, openEditTaskModal, openViewTaskModal }) => {
    const [modalView, setModalView] = useState();

    useEffect(() => {
        switch(modalType) {
            case Constants.MODAL_TYPE.VIEW_TASK:
                setModalView(<ViewTask task={task} openEditTaskModal={openEditTaskModal} />);
                break;
            case Constants.MODAL_TYPE.ADD_TASK:
                setModalView(<AddTask setFormError={setFormError} />);
                break;
            case Constants.MODAL_TYPE.EDIT_TASK:
                setModalView(<EditTask setFormError={setFormError} task={task} openViewTaskModal={openViewTaskModal} />);
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