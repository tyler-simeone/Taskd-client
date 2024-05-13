import React, { useEffect, useState } from "react";
import { Constants } from "../../../util/Constants";
import { AddTask } from "../../task/AddTask";

export const ModalView = ({ modalType, setFormError }) => {
    const [modalView, setModalView] = useState();

    useEffect(() => {
        if (modalView === undefined) {
            switch(modalType) {
                case Constants.MODAL_TYPE.ADD_TASK:
                    setModalView(<AddTask setFormError={setFormError} />);
                    break;
                default:
                    setModalView(<AddTask setFormError={setFormError} />);
                    break;
            }
        }
    }, []);

    return (
        <>
            {modalView}
        </>
    );
}