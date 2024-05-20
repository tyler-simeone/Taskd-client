import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { Constants } from "../../../util/Constants";
import { ConfirmDelete } from "./ConfirmDelete";

export const CenterModalView = () => {
    const {  modalType } = useContext(AppContext);

    const [modalView, setModalView] = useState();

    useEffect(() => {
        switch(modalType) {
            case Constants.MODAL_TYPE.CONFIRM_DELETE:
                setModalView(<ConfirmDelete />);
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