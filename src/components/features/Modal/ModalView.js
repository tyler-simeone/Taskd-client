import React, { useEffect, useState } from "react";
import { Constants } from "../../../util/Constants";
import { ViewTask } from "../../task/ViewTask";
import { AddTask } from "../../task/AddTask";
import { EditTask } from "../../task/EditTask";

export const ModalView = ({ modalType, setFormError, task, openEditTaskModal }) => {
    const [modalView, setModalView] = useState();
    const [hasViewChanged, setHasViewChanged] = useState(false);

    console.log("modalType: ", modalType);

    useEffect(() => {
        if (modalView === undefined) {
            switch(modalType) {
                case Constants.MODAL_TYPE.VIEW_TASK:
                    console.log("hi")
                    setModalView(<ViewTask task={task} openEditTaskModal={openEditTaskModal} />);
                    break;
                case Constants.MODAL_TYPE.ADD_TASK:
                    setModalView(<AddTask setFormError={setFormError} />);
                    break;
                case Constants.MODAL_TYPE.EDIT_TASK:
                    console.log("hiiii")
                    setModalView(<EditTask setFormError={setFormError} task={task} />);
                    break;
                default:
                    setModalView(<AddTask setFormError={setFormError} />);
                    break;
            }
        }
    }, [hasViewChanged]);

    return (
        <>
            {modalView}
        </>
    );
}