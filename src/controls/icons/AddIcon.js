import React from "react";
import AddIcon from '@mui/icons-material/Add';
import "./styles/AddIcon.css"

export const PbAddIcon = ({ classname }) => {

    return (
        <AddIcon className={`add-icon ${classname}`} />
    );
}