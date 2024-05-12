import React, { useEffect, useState } from "react";
import { Constants } from "../../../util/Constants";
import { AddTask } from "../../task/AddTask";

export const ModalView = ({ modalType }) => {
    const [modalView, setModalView] = useState();

    useEffect(() => {
        if (modalView === undefined) {
            switch(modalType) {
                case Constants.MODAL_TYPE.ADD_TASK:
                    setModalView(<AddTask />);
                    break;
                default:
                    setModalView(<AddTask />);
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